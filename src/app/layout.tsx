import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { cookies } from 'next/headers';

import { WithQueryClientProvider } from '@/components/WithQueryClientProvider';

import './globals.css';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata: Metadata = {
    title: 'CODE Campus Map',
    description: 'View the live state of the CODE Campus',
    openGraph: {
        title: 'CODE Campus Map',
        siteName: 'CODE Campus Map',
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const theme = (await cookies()).get('theme')?.value || 'light';

    return (
        <WithQueryClientProvider>
            <html lang="en" className={theme}>
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black`}
                >
                    {children}
                </body>
            </html>
        </WithQueryClientProvider>
    );
}
