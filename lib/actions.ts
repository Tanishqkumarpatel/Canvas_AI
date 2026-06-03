'use server'

import sql from "./db"
import { getServerSession } from "next-auth"
import { redirect } from 'next/navigation'
import { encryptToken } from "./secure"

export async function saveSettings(formData: FormData) {

    const url = formData.get('canvas_url') as string
    const token = formData.get('canvas_token') as string
    
    try {
        const session = await getServerSession()

        if (!session) {
            throw new Error("Session is null or undefined")
        }
        if (!session.user || !session.user.email) {
            throw new Error("User undefined or email does not exist!")
        }

        if (session?.user?.email === 'demo@canvasai.com') {
            return { error: 'Demo users cannot update settings' }
        }
        const encryptrdToken = encryptToken(token)
        await sql`UPDATE users SET canvas_url = ${url}, canvas_token = ${encryptrdToken} WHERE email=${session.user.email}`
        console.log("Saved url and token succesfully")
    } catch (error) {
        console.error(error)
        return {error: "Something Went Wrong Please Try Again Later!"}
    }
    redirect('/dashboard')
    return {success: "Settings Saved Succesfully!"}
}


export async function checkCanvasAccess() {

    try {
        const session = await getServerSession()

        if (!session)
            throw new Error("Session is null or undefined!")

        if (!session.user || !session.user.email) {
            throw new Error("User undefined or email does not exist!")
        }

        const data = await sql`SELECT canvas_token, canvas_url FROM users WHERE email=${session.user.email}`
        
        return data[0].canvas_token !== null && data[0].canvas_url !== null
        
    } catch (error) {
        console.error(error)
        return false
    }
}