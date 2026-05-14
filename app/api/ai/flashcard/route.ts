import { GoogleGenAI } from "@google/genai"
import { readFileAsBase64 } from "@/lib/files"
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

const testFiles = ['test_flashcard.pdf']

export async function GET() {
  const fileParts = testFiles.map(file => ({
      inlineData: readFileAsBase64(file)
    }))
  
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: [
      {
        role: "user",
        parts: [
          ...fileParts
        ]
      }
    ], // user input.
    config: {
      systemInstruction: "Make flash cards, from the sources provided. Flashcard should have a question and answer pair.",
      responseMimeType: "application/json", 
      responseJsonSchema:  {
        type: "array",
        items: {
          type: "object",
          properties: {
            question: { type: "string" },
            answer: { type: "string" }
          }
        }
      }

    }
  });
  if(!response.text) return
  return Response.json(JSON.parse(response.text))
}