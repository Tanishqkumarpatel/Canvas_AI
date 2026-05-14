'use client'


export default function FileList( { file, url } : {
    file: string,
    url: string
}
) 
{
    
    return (
        <button className="border p-4" onClick={() => {
            const fullUrl = `https://wjrlicdlrcxziscsxqau.supabase.co/storage/v1/object/public/mock/${url}/${file}`
            window.open(fullUrl)
        }} >  
            {file}
        </button>
    )
}

