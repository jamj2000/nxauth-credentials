import '@/app/globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Authjs 5: Credentials',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }) {

  return (
    <html lang="es">
      <body className={`bg-slate-100 ${inter.className}`}>
        <Header />
        <main className="px-10">
          {children}
        </main>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
