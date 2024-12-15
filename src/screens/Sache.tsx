'use client';

import dynamic from 'next/dynamic';

import { LoadingScreen } from './LoadingScreen';

// dynamically import the component so it doesn't get run on the server, which would cause hydration issues (aka state mismatch between server and client).
// this is because we read the initial state of the slides from localStorage.
const DynamicView = dynamic(() => import('@/screens/View'), {
    ssr: false,
    loading: () => <LoadingScreen />,
});

export const Sache: React.FC = () => {
    return <DynamicView />;
};
