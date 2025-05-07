'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gaming-dark text-white min-h-screen bg-cyber-grid bg-fixed`}>
          <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow pt-16">
        {children}
            </main>
          <Footer />
          </div>
      </body>
    </html>
  );
}
