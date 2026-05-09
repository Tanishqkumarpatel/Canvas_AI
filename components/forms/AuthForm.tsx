'use client'

import { signIn } from 'next-auth/react'

export default function AuthForm() {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col gap-4 border p-8 rounded-lg w-96'>

        <h1 className='text-2xl font-bold text-center'>Canvas AI</h1>
        <p className='text-center text-gray-500'>Your AI study companion</p>

        <button
          className='bg-white border flex items-center justify-center gap-2 p-2 rounded'
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
        >
          Continue with Google
        </button>

      </div>
    </div>
  )
}