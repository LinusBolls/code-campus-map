import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';

import { env } from '@/env';

export async function POST(req: NextRequest) {
    const refreshToken = req.cookies.get(
        'google:code-connect:refresh-token'
    )?.value;

    if (!refreshToken) {
        return NextResponse.json(
            { error: 'Missing cookie: "google:code-connect:refresh-token"' },
            { status: 400 }
        );
    }

    const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: env.server.google.clientId,
            client_secret: env.server.google.clientSecret,
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
        }).toString(),
    });

    if (!response.ok) {
        console.error(await response.json());
        throw new Error(
            'Google.refreshAccessToken: Failed to refresh access token'
        );
    }

    const data = await response.json();

    const accessToken = data.access_token;

    // data.expires_in will be 3599 seconds aka 1 hour
    const expiresAt = dayjs().add(data.expires_in, 'seconds');

    return NextResponse.json({ accessToken, expiresAt });
}
