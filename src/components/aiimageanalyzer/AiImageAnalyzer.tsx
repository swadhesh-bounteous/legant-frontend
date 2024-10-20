"use client";
import React, { useEffect, useState } from "react";
import {
  urlToFile,
  identifyImage,
  generateKeywords,
  generateRelatedQuestions,
} from "@/utils/AiImageAnalyzerHelper";
import { Typography } from "@/components";
import { Button } from "../ui/button";
import { useImageStore } from "@/store/useImageStore";

const AiImageAnalyzer = () => {
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [relatedQuestions, setRelatedQuestions] = useState<string[]>([]);
  const { selectedImage } = useImageStore();
  const imageUrl = selectedImage?.url;

  useEffect(() => {
    if (imageUrl) {
      urlToFile(imageUrl).then(setImageFile);
    }
  }, [imageUrl]);

  const handleIdentifyImage = async (additionalPrompt: string = "") => {
    if (!imageFile) return;

    try {
      const identifiedText = await identifyImage(
        imageFile,
        additionalPrompt,
        process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY!
      );
      setText(identifiedText);
      setKeywords(generateKeywords(identifiedText));
      const questions = await generateRelatedQuestions(
        identifiedText,
        process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY!
      );
      setRelatedQuestions(questions);
    } catch (error) {
      console.error("Error identifying image:", error);
      setText(
        error instanceof Error
          ? `Error identifying image: ${error.message}`
          : "An unknown error occurred while identifying the image."
      );
    }
  };

  const regenerateContent = (keyword: string) => {
    handleIdentifyImage(`Focus more on aspects related to "${keyword}".`);
  };

  const askRelatedQuestion = (question: string) => {
    handleIdentifyImage(
      `Answer the following question about the image: "${question}"`
    );
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
            className="text-xl font-semibold mt-4 mb-2 text-gray-700"
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
    <section
      aria-label="AI image analyzer"
      className="p-6 md:p-12 border-y border-gray-300"
    >
      <div className="flex p-2 gap-x-12">
      <Button
        variant="outline"
        onClick={() => handleIdentifyImage()}
        className="w-full md:w-[50%] mb-4 border-2 border-gray-600"
      >
        Analyze Image
      </Button>
      <Typography variant="p" className="line-clamp-2 text-sm text-gray-600">This provides AI generated details of the product, related questions and tags. It is integrated with Google Gemini API to provide watch data about the product</Typography>
      </div>
      
      {text && (
        <div className="bg-gray-50 p-8 border-t border-[1px] border-gray-600 rounded-md">
          <Typography variant="h4" className="text-lg font-semibold mb-2 text-gray-700">
            Image Information:
          </Typography>
          <div className="max-w-none text-sm">{renderTextWithDecoration(text)}</div>
        </div>
      )}
      {keywords.length > 0 && (
        <div className="mt-6 bg-gray-50 p-8 border-t border-[1px] border-gray-600 rounded-md">
          <Typography
            variant="h4"
            className="text-lg font-semibold mb-2 text-gray-700 my-2"
          >
            Related Keywords:
          </Typography>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <button
                key={index}
                onClick={() => regenerateContent(keyword)}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition duration-150 ease-in-out"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      )}
      {relatedQuestions.length > 0 && (
        <div className="mt-6 bg-gray-50 p-8 border-t border-[1px] border-gray-600 rounded-md">
          <Typography
            variant="h4"
            className="text-lg font-semibold mb-2 text-gray-700"
          >
            Related Questions:
          </Typography>
          <ul className="space-y-2">
            {relatedQuestions.map((question, index) => (
              <li key={index}>
                <button
                  onClick={() => askRelatedQuestion(question)}
                  className="text-left w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition duration-150 ease-in-out"
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
