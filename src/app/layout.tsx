'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/context/AuthContext';
import Link from 'next/link';
import { FaGamepad } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/register');

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen`}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            {!isAuthPage && <Header />}
            <main className={`flex-grow ${!isAuthPage ? 'pt-16' : ''}`}>
              {children}
            </main>
            {!isAuthPage && <Footer />}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
