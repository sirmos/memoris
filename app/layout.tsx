import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Memoris — Your digital life, passed on with care',
  description: 'Memoris helps you organize your accounts, assign them to loved ones, and ensure your wishes are carried out.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body className="font-sans antialiased bg-black text-white">
        {children}
      </body>
    </html>
  )
}
