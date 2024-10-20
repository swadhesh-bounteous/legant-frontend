import { GoogleGenerativeAI } from "@google/generative-ai";

export const urlToFile = async (url: string): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();
  const fileName = url.substring(url.lastIndexOf("/") + 1);
  return new File([blob], fileName, { type: blob.type });
};

export const fileToGenerativePart = async (
  file: File
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

export const generateKeywords = (text: string): string[] => {
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
  return Array.from(keywordSet).slice(0, 5);
};

export const generateRelatedQuestions = async (
  text: string,
  apiKey: string
): Promise<string[]> => {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent([
      `Based on the following information about an image, generate 5 related questions that someone might ask to learn more about the subject:

      ${text}

      Format the output as a simple list of questions, one per line.`,
    ]);
    const response = await result.response;
    const questions = response.text().trim().split("\n");
    return questions;
  } catch (error) {
    console.error("Error generating related questions:", error);
    return [];
  }
};

export const identifyImage = async (
  imageFile: File | null,
  additionalPrompt: string = "",
  apiKey: string
): Promise<string> => {
  if (!imageFile) return "";

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const imageParts = await fileToGenerativePart(imageFile);
    const result = await model.generateContent([
      `Identify this image and provide its name and important information including a brief explanation about that image. ${additionalPrompt}`,
      imageParts,
    ]);

    const response = await result.response;
    return response
      .text()
      .trim()
      .replace(/```/g, "")
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/-\s*/g, "")
      .replace(/\n\s*\n/g, "\n");
  } catch (error) {
    console.error("Error identifying image:", error);
    throw error;
  }
};
