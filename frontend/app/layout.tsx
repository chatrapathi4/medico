import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/sidebar-provider";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space"
})

export const metadata: Metadata = {
  title: 'MediSearch AI - Your Trusted Medical AI Assistant',
  description: 'Get instant, reliable answers to your health questions from trusted medical sources like WHO, CDC, and Mayo Clinic.',
  keywords: ['medical AI', 'health assistant', 'medical search', 'health questions', 'trusted medical information'],
}

export const viewport: Viewport = {
  themeColor: '#0ea5e9',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
        <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>

  )
}
