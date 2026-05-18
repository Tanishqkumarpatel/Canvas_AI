import Providers from '@/components/layout/providers'
import { Toaster } from 'sonner'
import '@/app/globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          {children}
          <Toaster position='top-right' />
        </Providers>
      </body>
    </html>
  )
}