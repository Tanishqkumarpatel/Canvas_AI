import { GoogleGenAI } from "@google/genai"
import { readFileAsBase64 } from "@/lib/files"
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

const testFiles = ['test_flashcard.pdf']

export async function GET() {
  const fileParts = testFiles.map(file => ({
      inlineData: readFileAsBase64(file)
    }))
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: [
      {
        role: "user",
        parts: [
          ...fileParts
        ]
      }
    ], // user input.
    config: {
      systemInstruction:
      `Summarize the provided course material clearly and concisely.
      
      Structure your summary with:
      - Key concepts and definitions
      - Main topics covered  
      - Important relationships between concepts
      - Anything likely to appear on an exam
      
      Use simple language and be concise.`,
    }
  });
  if (!response.text) return
  return Response.json({ summary: response.text })
}