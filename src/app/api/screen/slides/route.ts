import { AssistantAppThreadBlock } from '@slack/web-api/dist/types/response/ConversationsHistoryResponse';
import { NextResponse } from 'next/server';

import { getSlides } from '@/slack/fetchPublishedMessages';

export type Slide = {
    jsx?: React.ReactElement;

    title?: AssistantAppThreadBlock[];
    color?: string;
    description?: AssistantAppThreadBlock[];
    people?: string[];
    media?: { type: string; src: string; alt?: string }[];
    postedBy?: string;
    blocks?: AssistantAppThreadBlock[];
    emoji?: Record<string, string>;
    users?: Record<string, { name: string; color: string }>;
    channels?: Record<string, { name: string }>;
};

export async function GET() {
    return NextResponse.json(await getSlides());
}
