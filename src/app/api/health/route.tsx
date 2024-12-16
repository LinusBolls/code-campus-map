import { NextResponse } from 'next/server';

import { env } from '@/env';

import packageJson from '../../../../package.json';

export async function GET() {
    const { version } = packageJson;

    return NextResponse.json({
        ok: true,
        version,
        environment: env.server.nodeEnv,
    });
}
