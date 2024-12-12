import {
    Accessory,
    AccessoryElement,
    AssistantAppThreadBlock,
    DescriptionElement,
    PurpleElement,
    Style,
} from '@slack/web-api/dist/types/response/ConversationsHistoryResponse';
import React from 'react';

type Entities = {
    emoji?: Record<string, string>;
    users?: Record<string, { name: string; color: string }>;
    channels?: Record<string, { name: string }>;
};

type MessageBlock =
    | AssistantAppThreadBlock
    | Accessory
    | AccessoryElement
    | PurpleElement;

interface FormattedSlackTextProps {
    blocks: MessageBlock[];
    entities?: Entities;
}

const Text = ({
    text,
    style,
}: {
    text?: string | DescriptionElement;
    style?: Style | string;
}) => {
    let jsx: React.ReactNode = typeof text === 'string' ? text : text?.text;

    if (typeof style === 'string') return <span>{jsx}</span>;

    // TODO: what are these three generated from and what should they look like?
    if (style?.client_highlight) jsx = <mark>{jsx}</mark>;
    if (style?.highlight) jsx = <mark>{jsx}</mark>;
    if (style?.unlink) jsx = <span>{jsx}</span>;

    if (style?.bold) jsx = <strong>{jsx}</strong>;
    if (style?.italic) jsx = <em>{jsx}</em>;
    if (style?.strike) jsx = <del>{jsx}</del>;
    if (style?.code) jsx = <code>{jsx}</code>;
    if (Object.keys(style || {}).length < 1) jsx = <span>{jsx}</span>;

    return jsx;
};

const Block = ({
    block,
    entities,
}: {
    block: MessageBlock;
    entities?: Entities;
}): React.ReactNode => {
    let jsx: React.ReactNode = null;

    switch (block.type) {
        case 'rich_text_preformatted':
            jsx = (
                <pre className="slack-code-block">
                    {block.elements?.map((i, idx) => (
                        <Block block={i} key={idx} entities={entities} />
                    ))}
                </pre>
            );
            break;
        case 'rich_text_quote':
            jsx = (
                <blockquote className="slack-block-quote">
                    {block.elements?.map((i, idx) => (
                        <Block block={i} key={idx} entities={entities} />
                    ))}
                </blockquote>
            );
            break;
        case 'rich_text_section':
        case 'rich_text':
            jsx = block.elements?.map((i, idx) => (
                <Block block={i} key={idx} entities={entities} />
            ));
            break;

        case 'rich_text_list':
            jsx =
                block.style === 'bullet' ? (
                    <ul>
                        {block.elements?.map((i, idx) => (
                            <li key={idx}>
                                <Block
                                    block={i}
                                    key={idx}
                                    entities={entities}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <ol>
                        {block.elements?.map((i, idx) => (
                            <li key={idx}>
                                <Block
                                    block={i}
                                    key={idx}
                                    entities={entities}
                                />
                            </li>
                        ))}
                    </ol>
                );
            break;

        case 'channel':
            jsx = (
                <span className="slack-block-channel">
                    {/* @ts-expect-error */}#
                    {entities?.channels?.[block.channel_id]?.name}
                </span>
            );
            break;
        case 'user':
            jsx = (
                <span className="slack-block-user">
                    {/* @ts-expect-error */}@
                    {entities?.users?.[block.user_id]?.name}
                </span>
            );
            break;
        case 'text':
            jsx = <Text text={block.text} style={block.style} />;
            break;

        case 'link':
            jsx = (
                <a href={block.url} target="_blank" rel="noopener noreferrer">
                    <Text text={block.text} style={block.style} />
                </a>
            );
            break;

        case 'emoji':
            block = block as PurpleElement;

            if (entities?.emoji?.[block.name!]) {
                jsx = (
                    <img
                        src={entities.emoji[block.name!]}
                        alt={block.name}
                        style={{
                            width: '22px',
                            height: '22px',
                            marginTop: '-11px',
                        }}
                    />
                );
            } else {
                jsx = (
                    <span role="img" aria-label={block.name || ''}>
                        {block.unicode
                            ? String.fromCodePoint(parseInt(block.unicode, 16))
                            : ''}
                    </span>
                );
            }
            break;

        default:
            jsx = null;
    }
    return jsx;
};

const FormattedSlackText: React.FC<FormattedSlackTextProps> = ({
    blocks,
    entities,
}) => {
    return (
        <div
            className="formatted-slack-text"
            style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5' }}
        >
            {blocks.map((i, idx) => (
                <Block key={idx} block={i} entities={entities} />
            ))}
        </div>
    );
};
export default FormattedSlackText;
