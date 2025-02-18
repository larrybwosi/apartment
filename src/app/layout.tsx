"use client"

import type React from "react"

import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex-1 overflow-auto">{children}</main>
      </body>
    </html>
  )
}

