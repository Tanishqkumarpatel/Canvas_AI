'use client'

export default function FileList( { name, url } : {
    name: string,
    url: string
}
) 
{
    return (
        <button 
            className="text-left text-sm truncate hover:text-blue-600 transition-colors w-full"
            onClick={() => {
                const fullUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/mock/${url}`
                window.open(fullUrl)
            }} 
        >  
            {name}
        </button>
    )
}