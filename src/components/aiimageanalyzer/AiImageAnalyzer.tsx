"use client";
import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Typography } from "@/components";
import { Button } from "../ui/button";

type Props = {
  imageUrl: string; // Accept image as a URL prop
};

const AiImageAnalyzer: React.FC<Props> = ({ imageUrl }) => {
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [relatedQuestions, setRelatedQuestions] = useState<string[]>([]);

  useEffect(() => {
    const urlToFile = async (url: string): Promise<File> => {
      const response = await fetch(url);
      const blob = await response.blob();
      const fileName = url.substring(url.lastIndexOf("/") + 1);
      const file = new File([blob], fileName, { type: blob.type });
      return file;
    };

    if (imageUrl) {
      urlToFile(imageUrl).then(setImageFile);
    }
  }, [imageUrl]);

  const identifyImage = async (additionalPrompt: string = "") => {
    if (!imageFile) return;

    try {
      const genAI = new GoogleGenerativeAI(
        process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY!,
      );
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      const imageParts = await fileToGenerativePart(imageFile);
      const result = await model.generateContent([
        `Identify this image and provide its name and important information including a brief explanation about that image. ${additionalPrompt}`,
        imageParts,
      ]);

      const response = await result.response;
      const textD = response
        .text()
        .trim()
        .replace(/```/g, "")
        .replace(/\*\*/g, "")
        .replace(/\*/g, "")
        .replace(/-\s*/g, "")
        .replace(/\n\s*\n/g, "\n");
      setText(textD);
      generateKeywords(textD);
      await generateRelatedQuestions(textD);
    } catch (error) {
      console.error("Error identifying image:", error);
      if (error instanceof Error) {
        setText(`Error identifying image: ${error.message}`);
      } else {
        setText("An unknown error occurred while identifying the image.");
      }
    }
  };

  const generateKeywords = (text: string) => {
    const words = text.split(/\s+/);
    const keywordSet = new Set<string>();
    words.forEach((word) => {
      if (
        word.length > 4 &&
        !["this", "that", "with", "from", "have"].includes(word.toLowerCase())
      ) {
        keywordSet.add(word);
      }
    });
    setKeywords(Array.from(keywordSet).slice(0, 5));
  };

  const fileToGenerativePart = async (
    file: File,
  ): Promise<{ inlineData: { data: string; mimeType: string } }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result as string;
        const base64Content = base64Data.split(",")[1];
        resolve({
          inlineData: {
            data: base64Content,
            mimeType: file.type,
          },
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const regenerateContent = (keyword: string) => {
    identifyImage(`Focus more on aspects related to "${keyword}".`);
  };

  const generateRelatedQuestions = async (text: string) => {
    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY!,
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
      const result = await model.generateContent([
        `Based on the following information about an image, generate 5 related questions that someone might ask to learn more about the subject:

        ${text}

        Format the output as a simple list of questions, one per line.`,
      ]);
      const response = await result.response;
      const questions = response.text().trim().split("\n");
      setRelatedQuestions(questions);
    } catch (error) {
      console.error("Error generating related questions:", error);
      setRelatedQuestions([]);
    }
  };

  const askRelatedQuestion = (question: string) => {
    identifyImage(
      `Answer the following question about the image: "${question}"`,
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
    <section aria-label="AI image analyzer">
      <Button variant="default" onClick={() => identifyImage()}>
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
