'use client'


export default function FileList( { file, url } : {
    file: string,
    url: string
}
) 
{
    
    return (
        <button className="border p-4" onClick={()=>{
            console.log(`/api/files/${url}/${file}`)
            window.open(`/api/files/${url}/${file}`)
            }} >  
            {file}
        </button>
    )
}

