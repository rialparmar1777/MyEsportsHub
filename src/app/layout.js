import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MyEsports - Your Gaming Destination',
  description: 'Discover the latest in gaming, esports tournaments, and connect with fellow gamers.',
  keywords: 'esports, gaming, tournaments, competitive gaming, teams, players',
  authors: [{ name: 'MyEsports Team' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gaming-dark text-white min-h-screen bg-cyber-grid bg-fixed`}>
        <a href="#main" className="skip-link">Skip to content</a>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main id="main" className="flex-grow pt-20" role="main" aria-live="polite">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
