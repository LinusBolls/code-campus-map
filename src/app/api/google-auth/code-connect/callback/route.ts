import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';

import { env } from '@/env';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    if (!code) {
        return NextResponse.json(
            { error: 'Authorization code is missing' },
            { status: 400 }
        );
    }

    try {
        const res = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code,
                client_id: env.server.google.clientId,
                client_secret: env.server.google.clientSecret,
                redirect_uri:
                    env.server.host + '/api/google-auth/code-connect/callback',
                grant_type: 'authorization_code',
            }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error('Error exchanging code for tokens:', errorData);
            return NextResponse.json(
                { error: 'Failed to exchange code for tokens' },
                { status: 500 }
            );
        }
        const data = await res.json();

        const { access_token, refresh_token, expires_in } = data;

        const response = NextResponse.redirect(
            new URL(env.server.host, req.url)
        );

        const expiresAt = dayjs().add(expires_in, 'seconds');

        response.cookies.set('google:code-connect:access-token', access_token);
        response.cookies.set(
            'google:code-connect:expires-at',
            expiresAt.toISOString()
        );
        response.cookies.set(
            'google:code-connect:refresh-token',
            refresh_token
        );

        return response;
    } catch (err) {
        console.error(
            'Unexpected error:',
            (err as Error).message || 'Unknown error'
        );
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
