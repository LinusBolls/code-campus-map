import { ConversationsHistoryResponse, WebClient } from '@slack/web-api';
import { MessageElement } from '@slack/web-api/dist/types/response/ConversationsRepliesResponse';

import { cache as redisCache } from '@/backend/cache';
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
    return hasReactionFromOneOTheseUsers(
        message,
        'white_check_mark',
        env.server.slack.adminUserIds
    );
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
}

export const slack = new Slack();
