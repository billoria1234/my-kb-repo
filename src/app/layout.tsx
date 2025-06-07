// app/layout.tsx
import './styles/globals.css';
// app/layout.tsx
import './styles/globals.css';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import SessionProviderWrapper from './providers/SessionProvider';
import { authOptions } from '@/lib/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Your App Title',
  description: 'Your App Description',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProviderWrapper session={session}>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
