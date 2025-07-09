import React from 'react'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { PermissionProvider } from './context/permission.context'
import './globals.css'

const fontSans = Roboto({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['100', '300', '400', '500', '700', '900'],
})

export const metadata: Metadata = {
  title: 'Sistema Administrativo Sirca',
  description: 'Sistema Administrativo Sirca',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.JSX.Element {
  return (
    <html lang="es">
      <PermissionProvider>
        <body className={`${fontSans.variable} antialiased`}>{children}</body>
      </PermissionProvider>
    </html>
  )
}
