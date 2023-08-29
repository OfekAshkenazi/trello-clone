import Modal from '@/components/modal'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trello clone',
  description: 'Generated by Ofek Ashkenazi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body className="bg-[#F5F6F8]">
        {children}
        <Modal />
      </body>

    </html>
  )
}
