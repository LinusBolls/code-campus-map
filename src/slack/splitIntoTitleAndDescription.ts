import {
    Accessory,
    AccessoryElement,
    AssistantAppThreadBlock,
    PurpleElement,
} from '@slack/web-api/dist/types/response/ConversationsHistoryResponse';

export type MessageBlock =
    | AssistantAppThreadBlock
    | Accessory
    | AccessoryElement
    | PurpleElement;

const containsLinebreak = (block: MessageBlock): boolean => {
    if ('text' in block && (block.text as string).includes('\n')) {
        return true;
    }
    if ('elements' in block) {
        return block.elements?.some(containsLinebreak) ?? false;
    }
    return false;
};

export const splitIntoTitleAndDescription = (
    blocks: MessageBlock[]
): {
    title: AssistantAppThreadBlock[];
    description: AssistantAppThreadBlock[];
} => {
    const title: AssistantAppThreadBlock[] = [];
    const description: AssistantAppThreadBlock[] = [];

    let isAssigningToTitle = true;

    for (const block of blocks) {
        (isAssigningToTitle ? title : description).push(
            block as AssistantAppThreadBlock
        );
        if (containsLinebreak(block)) {
            isAssigningToTitle = false;
        }
    }

    return {
        title,
        description,
    };
};
