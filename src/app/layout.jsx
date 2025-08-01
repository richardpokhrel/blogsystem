import { Inter } from 'next/font/google';
import './globals.css';
import { PublicLayout } from '@/components/PublicLayout';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PublicLayout>
          {children}
        </PublicLayout>
      </body>
    </html>
  );
}
