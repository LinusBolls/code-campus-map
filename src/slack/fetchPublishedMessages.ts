import { MessageElement } from '@slack/web-api/dist/types/response/ConversationsHistoryResponse';

import { Slide } from '@/app/api/screen/slides/route';
import { env } from '@/env';

import { slack } from './slack';
import { splitIntoTitleAndDescription } from './splitIntoTitleAndDescription';

async function getUserInfo(userId?: string) {
    if (!userId) return null;

    const user = await slack.users.get(userId);

    if (!user) return null;

    const { name, color } = user;

    return { id: userId, name, color: '#' + color };
}
async function getChannelInfo(channelId?: string) {
    if (!channelId) return null;

    const channel = await slack.channels.get(channelId);

    if (!channel) return null;

    const { name } = channel;

    return { id: channelId, name };
}

const toSlide = async (
    message: MessageElement,
    emoji: Record<string, string>
): Promise<Slide> => {
    const user = await getUserInfo(message.user);

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
            [i!.id]: { name: i?.name, color: i?.color },
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
            [i!.id]: { name: i?.name },
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

    const { title, description } = splitIntoTitleAndDescription(
        message.blocks ?? []
    );

    return {
        title,
        description,
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

export async function getSlides() {
    const publishedMessages = await slack.publishedPosts.getAll();

    const emoji = await slack.emoji.getAll();

    const slides = await Promise.all(
        publishedMessages.map((i) => toSlide(i, emoji))
    );
    return slides;
}
