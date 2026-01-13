import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: `Session board`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dracula">
      <body>
        <div className="min-h-full flex">{children}</div>
      </body>
    </html>
  );
}
