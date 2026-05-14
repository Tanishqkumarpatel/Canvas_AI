import { GoogleGenAI } from "@google/genai"
import { fetchFileAsBase64 } from "@/lib/files"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

type fileType = {
  name: string,
  folder: string,
  url: string
}

export async function POST(request: Request) {
  try {
    const { files } = await request.json()
    const fileParts = await Promise.all(
      files.map(async (file: fileType) => ({
        inlineData: await fetchFileAsBase64(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/mock/${file.url}`)
      })))


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

    if(!response.text) return Response.json({ error: 'No response' }, { status: 500 })
    return Response.json({ message: response.text })
  } catch (error) {
    console.error(error)
    return Response.json({ error: String(error) }, { status: 500 })
  }
}