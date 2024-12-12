import { NextRequest, NextResponse } from 'next/server';

import { env } from '@/env';

import { fetchPublishedMessages } from '../screen/slides/route';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'Url is missing' }, { status: 400 });
    }
    const publishedMessages = await fetchPublishedMessages();

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
    return new Response(res.body);
}
