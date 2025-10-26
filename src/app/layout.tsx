import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JDX (Transformation) - AI Agent Platform',
  description: 'Transform your business processes with AI agents. Analyze job descriptions and resumes to identify automation opportunities.',
  keywords: ['JDX', 'AI Agent', 'Job Transformation', 'AI Automation', 'Business Innovation'],
  authors: [{ name: 'JDX Team' }],
  creator: 'JDX',
  publisher: 'JDX',
  metadataBase: new URL('https://jdxwork.com'),
  openGraph: {
    title: 'JDX (Transformation) - AI Agent Platform',
    description: 'Transform your business processes with AI agents. Analyze job descriptions and resumes to identify automation opportunities.',
    url: 'https://jdxwork.com',
    siteName: 'JDX Transformation',
    images: [
      {
        url: 'https://jdxwork.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'JDX Transformation Platform',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JDX (Transformation) - AI Agent Platform',
    description: 'Transform your business processes with AI agents.',
    images: ['https://jdxwork.com/og-image.png'],
    creator: '@jdx',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
