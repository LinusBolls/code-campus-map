import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import packageJson from '../../package.json';
import { SECOND } from './time';

const clientVersion = packageJson.version;

interface HealthResponse {
    ok: boolean;
    version: string;
    environment: 'development' | 'staging' | 'production';
}

async function getHealth(): Promise<HealthResponse> {
    const res = await fetch('/api/health');

    const data: HealthResponse = await res.json();

    return data;
}

/**
 * automatically refreshes the page if the version of the backend is higher than the version of the client.
 */
export function useApiHealth() {
    const router = useRouter();

    const query = useQuery({
        queryKey: ['health'],
        queryFn: getHealth,
        refetchInterval: 10 * SECOND,
    });

    const clientIsOutdated =
        typeof query.data?.version === 'string' &&
        clientVersion !== query.data.version;

    if (clientIsOutdated) {
        router.reload();
    }
    const isConnected = query.error == null;
    const isHealthy = query.data?.ok ?? false;

    return {
        clientVersion,
        isConnected,
        isHealthy,
    };
}
