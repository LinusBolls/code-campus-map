import Image from 'next/image';

import { Google } from '@/google';

export const metadata = {
    title: 'Login | CODE Campus Map',
};

export default function Page() {
    return (
        <main className="flex flex-col items-center justify-center w-screen min-h-screen bg-white dark:bg-black px-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2">
                Welcome to CODE Campus Map ツ
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-16">
                An internal tool for CODE University of Applied Sciences
                intended to run on a TV screen
            </p>
            <a
                href={Google.getAuthUrl()}
                className="flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-900 duration-100 px-2.5 h-10 border border-gray-300 dark:border-gray-600 rounded-sm w-72"
            >
                <Image
                    alt="Google Logo"
                    width="24"
                    height="24"
                    src="/google.svg"
                    className="mr-2"
                />
                <span className="text-[14px] font-bold leading-[40px] text-[#172b4d] dark:text-gray-200">
                    Sign in with @code.berlin
                </span>
            </a>
        </main>
    );
}
