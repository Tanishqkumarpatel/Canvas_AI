import { readFileSync } from "fs"
import { getMimeType } from "@/lib/files"
import * as pth from 'path'

export async function GET(request: Request ,{ params }: { params: Promise<{ path: Array<string> }> }) {
    const { path } = await params
    console.log(...path)
    const filePath = pth.join(process.cwd(), ...path)
    const data = readFileSync(filePath)
    return new Response(data, {
        headers: { 'Content-Type':  getMimeType(filePath)} 
    })
}