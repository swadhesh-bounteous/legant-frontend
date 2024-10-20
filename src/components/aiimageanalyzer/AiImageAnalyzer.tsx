"use client";
import React, { useEffect, useState } from "react";
import { urlToFile, identifyImage, generateKeywords, generateRelatedQuestions } from "@/utils/AiImageAnalyzerHelper"
import { Typography } from "@/components";
import { Button } from "../ui/button";

type Props = {
  imageUrl: string; 
};

const AiImageAnalyzer: React.FC<Props> = ({ imageUrl }) => {
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [relatedQuestions, setRelatedQuestions] = useState<string[]>([]);

  useEffect(() => {
    if (imageUrl) {
      urlToFile(imageUrl).then(setImageFile);
    }
  }, [imageUrl]);

  const handleIdentifyImage = async (additionalPrompt: string = "") => {
    if (!imageFile) return;

    try {
      const identifiedText = await identifyImage(imageFile, additionalPrompt, process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY!);
      setText(identifiedText);
      setKeywords(generateKeywords(identifiedText));
      const questions = await generateRelatedQuestions(identifiedText, process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY!);
      setRelatedQuestions(questions);
    } catch (error) {
      console.error("Error identifying image:", error);
      setText(error instanceof Error ? `Error identifying image: ${error.message}` : "An unknown error occurred while identifying the image.");
    }
  };

  const regenerateContent = (keyword: string) => {
    handleIdentifyImage(`Focus more on aspects related to "${keyword}".`);
  };

  const askRelatedQuestion = (question: string) => {
    handleIdentifyImage(`Answer the following question about the image: "${question}"`);
  };

  const renderTextWithDecoration = (text: string) => {
    return text.split("\n").map((line, index) => {
      if (
        line.startsWith("Important Information:") ||
        line.startsWith("Other Information:")
      ) {
        return (
          <Typography
            variant="h4"
            className="text-xl font-semibold mt-4 mb-2 text-blue-700"
            key={index}
          >
            {line}
          </Typography>
        );
      } else if (line.match(/^\d+\./) || line.startsWith("-")) {
        return (
          <li key={index} className="ml-4 mb-2 text-gray-700">
            {line}
          </li>
        );
      } else if (line.trim() !== "") {
        return (
          <Typography key={index} variant="p" className="mb-2 text-gray-800">
            {line}
          </Typography>
        );
      }
      return null;
    });
  };

  return (
    <section aria-label="AI image analyzer" className="p-6 md:p-12 border-y border-gray-300">
      <Button variant="default" onClick={() => handleIdentifyImage()} className="w-full">
        Analyze Image
      </Button>
      {text && (
        <div className="bg-blue-50 p-8 border-t border-blue-100">
          <Typography
            variant="h3"
            className="text-xl font-semibold text-blue-800"
          >
            Image information
          </Typography>
          <div className="max-w-none">{renderTextWithDecoration(text)}</div>
        </div>
      )}
      {keywords.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2 text-blue-700">
            Related Keywords:
          </h4>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <button
                key={index}
                onClick={() => regenerateContent(keyword)}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition duration-150 ease-in-out"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      )}
      {relatedQuestions.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2 text-blue-700">
            Related Questions:
          </h4>
          <ul className="space-y-2">
            {relatedQuestions.map((question, index) => (
              <li key={index}>
                <button
                  onClick={() => askRelatedQuestion(question)}
                  className="text-left w-full bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition duration-150 ease-in-out"
                >
                  {question}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default AiImageAnalyzer;
