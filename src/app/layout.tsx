import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/theme-provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'JD 자동화 분석기 - 당신의 JD, 자동화 관점에서 다시 보기',
  description: 'Job Description을 분석하여 자동화 기회를 발견하고, 구현 가이드와 코드 예시를 제공하는 AI 도구입니다.',
  keywords: ['JD', '자동화', '업무 자동화', 'AI', 'Job Description', '채용', 'HR'],
  authors: [{ name: 'JD Automation Team' }],
  creator: 'JD Automation Team',
  publisher: 'JD Automation',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    title: 'JD 자동화 분석기',
    description: 'Job Description을 분석하여 자동화 기회를 발견하세요',
    siteName: 'JD 자동화 분석기',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JD 자동화 분석기',
    description: 'Job Description을 분석하여 자동화 기회를 발견하세요',
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
