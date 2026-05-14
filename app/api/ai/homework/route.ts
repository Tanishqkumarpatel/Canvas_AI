import { GoogleGenAI } from "@google/genai"
import { readFileAsBase64 } from "@/lib/files"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

// Test files — replace with real uploaded files later
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
    ],
    config: {
      systemInstruction: `You are a pedagogical homework helper. Your goal is to help students 
      understand concepts, not just give them answers. 
      
      When a student asks a question:
      - Guide them with hints and leading questions
      - Break down complex problems into smaller steps  
      - Ask them what they already know about the topic
      - Praise correct reasoning and gently correct mistakes
      - Never give the final answer directly unless the student has genuinely tried
      
      Use the provided course materials as your only source of truth.`
    }
  })

  if (!response.text) return Response.json({ error: 'No response' })
  return Response.json({ message: response.text })
}