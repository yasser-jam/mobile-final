import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Attendance PWA",
  description: "A mobile-first attendance and reading sessions tracking app",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Attendance PWA",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Attendance PWA",
    title: "Attendance PWA",
    description: "A mobile-first attendance and reading sessions tracking app",
  },
  twitter: {
    card: "summary",
    title: "Attendance PWA",
    description: "A mobile-first attendance and reading sessions tracking app",
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: "#0C9488",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Attendance PWA" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0C9488" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="application-name" content="Attendance PWA" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-startup-image" href="/splash.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
