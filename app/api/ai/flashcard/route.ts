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
    if(!response.text) return Response.json({ error: 'No response' }, { status: 500 })
    return Response.json(JSON.parse(response.text))
  } catch (error) {
    console.error(error)
    return Response.json({ error: String(error) }, { status: 500 })
  }
}