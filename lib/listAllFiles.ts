import { supabase } from '@/lib/supabase'

type filesType = {
    name: string,
    folder: string,
    url: string
}[]

export async function listAllFiles(bucket: string, path: string, courseCode: string): Promise<filesType> {
  const { data } = await supabase.storage.from(bucket).list(path)
  
  const results = await Promise.all(
    data?.map(async item => {
      if (item.id === null) {
        return listAllFiles(bucket, `${path}/${item.name}`, courseCode)
      } else {
        return [{
          name: item.name,
          folder: path === courseCode ? 'root' : path.replace(`${courseCode}/`, ''),
          url: `${path}/${item.name}`
        }]
      }
    }) ?? []
  )
  
  return results.flat()
}