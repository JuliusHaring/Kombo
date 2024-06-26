import './scripts/envConfig';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SideNav from '../components/navigation/SideNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen bg-beige-100`}>
        <div className="fixed bottom-0 left-0 top-0 z-50 w-16 transition-all duration-300 ease-in-out hover:w-64">
          <SideNav />
        </div>
        <div className="ml-20 mt-5 flex-grow">{children}</div>
      </body>
    </html>
  );
}
