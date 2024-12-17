import { ConversationsHistoryResponse, WebClient } from '@slack/web-api';
import { MessageElement } from '@slack/web-api/dist/types/response/ConversationsRepliesResponse';

import { FileResponse, cache as redisCache } from '@/backend/cache';
import { Config } from '@/config';
import { env } from '@/env';

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
    if (!message.user) return false;

    const isApprovedByAuthor = hasReactionFromOneOTheseUsers(
        message,
        'white_check_mark',
        [message.user]
    );
    const isApprovedByAdmin = hasReactionFromOneOTheseUsers(
        message,
        'white_check_mark',
        env.server.slack.adminUserIds
    );
    const isVetoedByAdmin = hasReactionFromOneOTheseUsers(
        message,
        'x',
        env.server.slack.adminUserIds
    );

    if (Config.POSTS_REQUIRE_APPROVAL) {
        return isApprovedByAuthor && isApprovedByAdmin;
    } else {
        return isApprovedByAuthor && !isVetoedByAdmin;
    }
};

class Slack {
    constructor(
        private client = new WebClient(env.server.slack.token),
        private cache = redisCache
    ) {}
    public emoji = {
        getAll: async (): Promise<Record<string, string>> => {
            const cachedData = await this.cache.slack.emoji.get();

            if (cachedData) return cachedData;

            const data = (await this.client.emoji.list()).emoji;

            if (!data) throw new Error('[Slack] Failed to fetch emoji');

            await this.cache.slack.emoji.set(data);

            return data;
        },
    };
    public users = {
        get: async (
            userId: string
        ): Promise<{ name: string; color: string }> => {
            const cachedData = await this.cache.slack.users.get(userId);

            if (cachedData) return cachedData;

            const { user } = await this.client.users.info({
                user: userId,
            });

            if (!user) throw new Error('[Slack] Failed to fetch user');

            const data = { name: user.name!, color: '#' + user.color };

            await this.cache.slack.users.set(userId, data);

            return data;
        },
    };
    public channels = {
        get: async (channelId: string): Promise<{ name: string }> => {
            const cachedData = await this.cache.slack.channels.get(channelId);

            if (cachedData) return cachedData;

            const { channel } = await this.client.conversations.info({
                channel: channelId,
            });

            if (!channel) throw new Error('[Slack] Failed to fetch channel');

            const data = { name: channel.name! };

            await this.cache.slack.channels.set(channelId, data);

            return data;
        },
    };
    public publishedPosts = {
        getAll: async (): Promise<MessageElement[]> => {
            const cachedData = await this.cache.slack.publishedPosts.get();

            if (cachedData) return cachedData;

            const history = (await this.client.conversations.history({
                channel: env.server.slack.channelId,
                oldest: '0',
                limit: 99,
            })) as ConversationsHistoryResponse;

            const publishedPosts =
                history.messages?.filter(
                    (i) =>
                        i.type === 'message' &&
                        i.subtype == null &&
                        i.text?.length &&
                        isPublished(i)
                ) ?? [];

            await this.cache.slack.publishedPosts.set(publishedPosts);

            return publishedPosts;
        },
    };
    public files = {
        get: async (url: string): Promise<FileResponse | null> => {
            const publishedPosts = await this.publishedPosts.getAll();

            const isAllowedToFetch = publishedPosts.some((i) =>
                i.files?.some((f) => f.url_private_download === url)
            );
            if (!isAllowedToFetch) return null;

            const cachedData = await this.cache.slack.files.get(url);

            if (cachedData) return cachedData;

            const res = await fetch(url, {
                headers: {
                    Authorization: 'Bearer ' + env.server.slack.token,
                },
            });
            const buffer = await res.arrayBuffer();

            const data: FileResponse = {
                headers: serializeHeaders(res.headers),
                buffer,
            };
            await this.cache.slack.files.set(url, data);

            return data;
        },
    };
}

export const slack = new Slack();

const serializeHeaders = (headers: Headers) => {
    const headersObj: Record<string, string> = {};

    headers.forEach((value, key) => {
        headersObj[key] = value;
    });
    return headersObj;
};
