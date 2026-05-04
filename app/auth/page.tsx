'use client'
import { login, signup } from '@/lib/auth';

export default function AuthPage() {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <form className='flex flex-col gap-4 border p-8 rounded-lg w-96'>
        
        <h1 className='text-2xl font-bold text-center'>Welcome</h1>

        <span className='flex flex-col gap-1'>
          <label htmlFor='email'>Email</label>
          <input
            className='border rounded p-2 w-full'
            type="email"
            name="email"
            placeholder="Email"
            required
          />
        </span>

        <span className='flex flex-col gap-1'>
          <label htmlFor='password'>Password</label>
          <input
            className='border rounded p-2 w-full'
            type="password"
            name="password"
            placeholder="Password"
            minLength={8}
            required
          />
        </span>

        <div className='flex flex-row gap-2 mt-2'>
          <button
            className='bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-800'
            type="submit"
            formAction={login}
          >
            Log In
          </button>
          <button
            className='bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-800'
            type="submit"
            formAction={signup}
          >
            Sign Up
          </button>
        </div>

      </form>
    </div>
  )
}

