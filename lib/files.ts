import * as fs from 'fs'
import * as path from 'path'

export function getMimeType(filename: string) {
  const ext = filename.split('.').pop()?.toLowerCase()
  switch(ext) {
    case 'pdf':  return 'application/pdf'
    case 'ppt':
    case 'pptx': return 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    case 'doc':
    case 'docx': return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    default:     return 'text/plain'
  }
}

export function readFileAsBase64(filename: string) {
  const buffer = fs.readFileSync(path.join(process.cwd(), filename))
  return {
    mimeType: getMimeType(filename),
    data: buffer.toString('base64')
  }
}
