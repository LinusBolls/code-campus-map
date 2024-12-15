'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import { LoadingScreen } from './LoadingScreen';

// dynamically import the component so it doesn't get run on the server, which would cause hydration issues (aka state mismatch between server and client).
// this is because we read the initial state of the slides from localStorage.
const DynamicView = dynamic(() => import('@/screens/View'), {
    ssr: false,
    loading: () => <LoadingScreen />,
});

export const Sache: React.FC = () => {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/cache-offline-page.js')
                .then(() => console.info('worker registered'))
                .catch((err) =>
                    console.error('failed to register worker:', err)
                );
        }
    }, []);
    return <DynamicView />;
};
