import { GoogleGenAI } from "@google/genai"
import { fetchFileAsBase64 } from "@/lib/files"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

type fileType = {
  name: string,
  folder: string,
  url: string
}

type Message = {
  role: 'user' | 'model',
  content: string
}

export async function POST(request: Request) {
  try {
    const { files, messages=[], userMessage } = await request.json()

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
            ...fileParts,
            { text: messages.length>0 ? messages[0].content : userMessage } 
          ]
        },
        ...messages.slice(1).map((msg:Message)=>({
          role: msg.role,
          parts: [{ text:msg.content }]
        })),
        ...(messages.length > 0 ? [{
          role: 'user',
          parts: [{ text: userMessage }]
        }]:[])
      ],
      config: {
        systemInstruction: `You are a helpful study assistant with access to the student's course materials.

        Your role is to answer questions about the provided documents accurately and helpfully.

        Guidelines:
        - Answer questions directly and clearly based on the provided materials
        - Quote or reference specific parts of the materials when relevant
        - If something is not covered in the materials, say so clearly
        - Keep answers concise but thorough
        - Use simple language appropriate for a university student
        - If asked to explain a concept, use examples from the materials where possible

        Only use the provided course materials as your source of truth. Do not use outside knowledge.`
      }
    })

    if(!response.text) return Response.json({ error: 'No response' }, { status: 500 })
    return Response.json({ message: response.text })
  } catch (error) {
    console.error(error)
    return Response.json({ error: String(error) }, { status: 500 })
  }
}