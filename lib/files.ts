export function getMimeType(url: string) {
  const ext = url.split('.').pop()?.toLowerCase()
  switch(ext) {
    case 'pdf':  return 'application/pdf'
    case 'ppt':
    case 'pptx': return 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    case 'doc':
    case 'docx': return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    default:     return 'text/plain'
  }
}

export async function fetchFileAsBase64(url: string) {
  const res = await fetch(url)
    const buffer = await res.arrayBuffer()
    const base64 = Buffer.from(buffer).toString('base64')
    return {
      mimeType: getMimeType(url),
      data: base64
    }
}
