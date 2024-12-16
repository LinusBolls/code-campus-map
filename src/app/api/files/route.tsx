import { NextRequest, NextResponse } from 'next/server';

import { Config } from '@/config';
import { env } from '@/env';
import { slack } from '@/slack/slack';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'Url is missing' }, { status: 400 });
    }
    const publishedMessages = await slack.publishedPosts.getAll();

    if (
        !publishedMessages.some((i) =>
            i.files?.some((f) => f.url_private_download === url)
        )
    ) {
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const res = await fetch(url, {
        headers: {
            Authorization: 'Bearer ' + env.server.slack.token,
        },
    });
    const headers = new Headers(res.headers);
    headers.set(
        'Cache-Control',
        `public, max-age=${Config.FILE_CACHE_DURATION_MS / 1000}, immutable`
    );
    headers.set(
        'Expires',
        new Date(Date.now() + Config.FILE_CACHE_DURATION_MS).toUTCString()
    );
    headers.set('ETag', res.headers.get('ETag') || ''); // Optional: Use Slack's ETag
    headers.set(
        'Last-Modified',
        res.headers.get('Last-Modified') || new Date().toUTCString()
    );
    return new NextResponse(res.body, { headers, status: res.status });
}
