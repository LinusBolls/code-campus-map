import { ConversationsHistoryResponse, WebClient } from '@slack/web-api';
import { AssistantAppThreadBlock } from '@slack/web-api/dist/types/response/ChatPostMessageResponse';
import { MessageElement } from '@slack/web-api/dist/types/response/ConversationsHistoryResponse';
import { NextResponse } from 'next/server';

import { env } from '@/env';

const slack = new WebClient(env.server.slack.token);

async function getUserInfo(userId?: string) {
    if (!userId) return null;

    const { user } = await slack.users.info({
        user: userId,
    });
    if (!user) return null;

    const { name, color } = user;

    return { id: userId, name, color: '#' + color };
}
async function getChannelInfo(channelId?: string) {
    if (!channelId) return null;

    const { channel } = await slack.conversations.info({
        channel: channelId,
    });
    if (!channel) return null;

    const { name } = channel;

    return { id: channelId, name };
}

const toSlide = async (message: MessageElement): Promise<Slide> => {
    const [rawTitle, ...rawDescription] = message.text?.split('\n') ?? [];

    const user = await getUserInfo(message.user);

    const { emoji } = await slack.emoji.list();

    const allEmojisthatOccurrInMessage = message.blocks?.flatMap((block) => {
        if ('elements' in block) {
            return block.elements?.flatMap((element) => {
                if (element.type === 'emoji') {
                    // @ts-expect-error this seems to work
                    return element.name;
                } else if ('elements' in element) {
                    return element.elements?.flatMap((element) => {
                        // @ts-expect-error this seems to work
                        if (element.type === 'emoji') {
                            // @ts-expect-error this seems to work
                            return element.name;
                        }
                        return [];
                    });
                }
                return [];
            });
        }
    });

    const allChannels = message.blocks?.flatMap((block) => {
        if ('elements' in block) {
            return block.elements?.flatMap((element) => {
                if (element.type === 'channel') {
                    // @ts-expect-error this seems to work
                    return element.channel_id;
                } else if ('elements' in element) {
                    return element.elements?.flatMap((element) => {
                        // @ts-expect-error this seems to work
                        if (element.type === 'channel') {
                            // @ts-expect-error this seems to work
                            return element.channel_id;
                        }
                        return [];
                    });
                }
                return [];
            });
        }
    });

    const allUsers = message.blocks?.flatMap((block) => {
        if ('elements' in block) {
            return block.elements?.flatMap((element) => {
                if (element.type === 'user') {
                    // @ts-expect-error this seems to work
                    return element.user_id;
                } else if ('elements' in element) {
                    return element.elements?.flatMap((element) => {
                        // @ts-expect-error this seems to work
                        if (element.type === 'user') {
                            // @ts-expect-error this seems to work
                            return element.user_id;
                        }
                        return [];
                    });
                }
                return [];
            });
        }
    });

    const usersArr = await Promise.all(
        allUsers?.map(async (userId) => {
            return await getUserInfo(userId);
        }) ?? []
    );
    const usersRecord = usersArr.reduce((obj, i) => {
        return {
            ...obj,
            [i?.id!]: { name: i?.name, color: i?.color },
        };
    }, {});

    const channelsArr = await Promise.all(
        allChannels?.map(async (channelId) => {
            return await getChannelInfo(channelId);
        }) ?? []
    );

    const channelsRecord = channelsArr.reduce((obj, i) => {
        return {
            ...obj,
            [i?.id!]: { name: i?.name },
        };
    }, {});

    const emojis = emoji
        ? allEmojisthatOccurrInMessage?.reduce(
              (obj, i) => ({
                  ...obj,
                  [i]: emoji[i],
              }),
              {}
          )
        : undefined;

    return {
        title: rawTitle.trim(),
        description: rawDescription.join('\n').trim(),
        color: user?.color,
        media: message.files?.map((i) => ({
            type: i.mimetype!,
            src:
                env.server.host +
                '/api/files?url=' +
                encodeURIComponent(i.url_private_download!),
            alt: i.alt_txt,
        })),
        postedBy: user?.name,
        blocks: message.blocks,
        emoji: emojis,
        users: usersRecord,
        channels: channelsRecord,
    };
};

const hasReactionFromOneOTheseUsers = (
    message: MessageElement,
    reactionName: string,
    userIds: string[]
) => {
    const reaction = message.reactions?.find((i) => i.name === reactionName);

    const reactedWithReaction = reaction?.users?.some((i) =>
        userIds.includes(i)
    );

    return reactedWithReaction;
};

const isPublished = (message: MessageElement) => {
    return hasReactionFromOneOTheseUsers(
        message,
        'white_check_mark',
        env.server.slack.adminUserIds
    );
};

export type Slide = {
    jsx?: React.ReactElement;

    title?: string;
    color?: string;
    description?: string;
    people?: string[];
    media?: { type: string; src: string; alt?: string }[];
    postedBy?: string;
    blocks?: AssistantAppThreadBlock[];
    emoji?: Record<string, string>;
    users?: Record<string, { name: string; color: string }>;
    channels?: Record<string, { name: string }>;
};

export async function GET() {
    const publishedMessages = await fetchPublishedMessages();

    const slides = await Promise.all(publishedMessages.map(toSlide));

    return NextResponse.json(slides);
}

export async function fetchPublishedMessages() {
    const history = (await slack.conversations.history({
        channel: env.server.slack.channelId,
        oldest: '0',
        limit: 10,
    })) as ConversationsHistoryResponse;

    const publishedMessages =
        history.messages?.filter(
            (i) =>
                i.type === 'message' &&
                i.subtype == null &&
                i.text?.length &&
                isPublished(i)
        ) ?? [];

    return publishedMessages;
}
