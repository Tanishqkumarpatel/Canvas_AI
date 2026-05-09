'use client'

import { useState } from 'react'
import { signOut, useSession } from "next-auth/react"
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { data } = useSession()

  return (
    <>
      {/* <button
        className='fixed top-4 left-4 z-30 text-2xl'
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button> */}

      <header className='flex items-center p-2 border-b bg-blue-600'>
        <button
            className='text-white text-2xl'
            onClick={() => setIsOpen(!isOpen)}
        >
            ☰
        </button>
        <h1 className='m-auto font-bold text-xl text-white'>Canvas AI</h1>
    </header>

      {isOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-10'
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-20 flex flex-col p-4 gap-2 shadow-xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              
        <Link
            href='/dashboard'
            onClick={() => setIsOpen(false)}
            className='p-2 rounded text-green-400 hover:bg-gray-700'
        >
            🏡 Home
        </Link>

        <Link
          href='/dashboard/settings'
          className='p-2 rounded text-white hover:bg-gray-700'
          onClick={() => setIsOpen(false)}
        >
          ⚙️ Settings
        </Link>

        <button
          className='p-2 mt-auto rounded text-left text-red-400 hover:bg-gray-700'
          onClick={() => signOut({ callbackUrl: '/auth' })}
        >
          🚪 Sign Out
        </button>

      </div>
    </>
  )
}