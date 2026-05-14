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
      systemInstruction:
      `You are a quiz generator. Generate a quiz from the provided course materials.
      
      Rules:
      - Mix question types based on the content (multiple choice, true/false, short answer, matching, problem solving)
      - For multiple choice always provide 4 options
      - For matching provide equal pairs
      - Make sure answers are accurate and based only on the provided material
      - Difficulty should match university level`,

      responseMimeType: "application/json",
      responseJsonSchema: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            type: { type: "string" }, // "multiple_choice" | "true_false" | "short_answer" | "matching" | "problem_solving"
            question: { type: "string" },
            options: { type: "array", items: { type: "string" } }, // for multiple choice
            pairs: { type: "array", items: { type: "object", properties: { left: { type: "string" }, right: { type: "string" } } } }, // for matching
            answer: { type: "string" },
            explanation: { type: "string" } // shown after submission
          }
        }
      }
    }
  });
  if(!response.text) return
  return Response.json(JSON.parse(response.text))
}