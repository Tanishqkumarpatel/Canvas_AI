'use client'

import { signIn } from "next-auth/react"

export default function DemoBttn() {
    return (
        <button 
            onClick={() => signIn('credentials', {
                email: 'demo@canvasai.com',
                password: 'demo123',
                callbackUrl: '/dashboard'
                })} 
            className="flex items-center gap-5 self-start rounded-lg bg-cyan-400 px-6 py-3 text-sm font-medium text-white hover:bg-blue-400 md:text-base">
            Try Demo!
        </button>
    )
}