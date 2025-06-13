'use client'
import type React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: '#0C9488',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((reg) => console.log('Service worker registered.', reg))
        .catch((err) => console.error('SW registration failed:', err));
    }
  }, []);
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' />
        <link rel='apple-touch-icon' href='/icon-192.png' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='Attendance PWA' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='msapplication-TileColor' content='#0C9488' />
        <meta name='msapplication-tap-highlight' content='no' />
        <meta name='application-name' content='Attendance PWA' />
        <meta
          name='apple-mobile-web-app-status-bar-style'
          content='black-translucent'
        />
        <link rel='apple-touch-startup-image' href='/splash.png' />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
