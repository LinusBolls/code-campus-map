import { ConversationsHistoryResponse, WebClient } from '@slack/web-api';
import { MessageElement } from '@slack/web-api/dist/types/response/ConversationsHistoryResponse';

import { env } from '@/env';

const slack = new WebClient(env.server.slack.token);

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
