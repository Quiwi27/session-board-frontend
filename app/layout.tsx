import type { Metadata } from 'next';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: `Session board`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-full flex flex-col">
          <header className="navbar bg-base-100 border-b border-base-200 px-4">
            <div className="flex-1">
              <Link href="/" className="btn btn-ghost text-xl font-bold">Session Board</Link>
            </div>
          </header>
          <main className="flex flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
