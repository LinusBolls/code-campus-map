'use client';

import { useState } from 'react';

import { useInterval } from '@/hooks/useInterval';

import { SECOND } from './time';

const getIsOnline = () =>
    typeof navigator === 'undefined' ? true : navigator.onLine;

export const useIsOnline = () => {
    const [isOnline, setIsOnline] = useState(getIsOnline());

    useInterval(() => {
        setIsOnline(getIsOnline());
    }, SECOND);

    return isOnline;
};
