import { describe, expect, it } from 'vitest';

import { splitIntoTitleAndDescription } from './splitIntoTitleAndDescription';

describe('splitIntoTitleAndDescription', () => {
    it('works', () => {
        expect(
            splitIntoTitleAndDescription([
                {
                    type: 'rich_text',
                    block_id: 'd9X9G',
                    elements: [
                        {
                            type: 'rich_text_section',
                            elements: [
                                {
                                    type: 'text',
                                    text: 'Monday Movie Night ',
                                    style: {
                                        bold: true,
                                    },
                                },
                                {
                                    type: 'text',
                                    text: '15.12.',
                                    style: {
                                        bold: true,
                                        italic: true,
                                    },
                                },
                                {
                                    type: 'text',
                                    text: '\n\n',
                                },
                            ],
                        },
                        {
                            type: 'rich_text_quote',
                            elements: [
                                {
                                    type: 'link',
                                    url: 'https://google.com',
                                    text: "We're going to be watching ",
                                },
                                {
                                    type: 'link',
                                    url: 'https://google.com',
                                    text: 'American Psycho',
                                    style: {
                                        bold: true,
                                        italic: true,
                                    },
                                },
                                {
                                    type: 'link',
                                    url: 'https://google.com',
                                    text: ' (2000)',
                                    style: {
                                        italic: true,
                                    },
                                },
                                {
                                    type: 'text',
                                    text: '!\n\nSee you at 19:00 in Cosmos (the space with the tv next to kitchen)',
                                },
                            ],
                        },
                        {
                            type: 'rich_text_section',
                            elements: [
                                {
                                    type: 'text',
                                    text: '\n',
                                },
                                {
                                    type: 'emoji',
                                    name: 'popcorn',
                                    unicode: '1f37f',
                                },
                                {
                                    type: 'text',
                                    text: " as always, we'll also have popcorn ",
                                },
                                {
                                    type: 'emoji',
                                    name: 'slightly_smiling_face',
                                    unicode: '1f642',
                                },
                                {
                                    type: 'text',
                                    text: '\n\n',
                                },
                                {
                                    type: 'text',
                                    text: 'moin meister',
                                    style: {
                                        strike: true,
                                    },
                                },
                                {
                                    type: 'text',
                                    text: '\n\n',
                                },
                                {
                                    type: 'text',
                                    text: 'hoher',
                                    style: {
                                        code: true,
                                    },
                                },
                                {
                                    type: 'text',
                                    text: '\n\n',
                                },
                                {
                                    type: 'emoji',
                                    name: 'squirrel',
                                },
                                {
                                    type: 'text',
                                    text: '\n\n',
                                },
                            ],
                        },
                        {
                            type: 'rich_text_list',
                            elements: [
                                {
                                    type: 'rich_text_section',
                                    elements: [
                                        {
                                            type: 'text',
                                            text: 'foo',
                                        },
                                    ],
                                },
                                {
                                    type: 'rich_text_section',
                                    elements: [
                                        {
                                            type: 'text',
                                            text: 'bar',
                                        },
                                    ],
                                },
                                {
                                    type: 'rich_text_section',
                                    elements: [
                                        {
                                            type: 'text',
                                            text: 'baz',
                                        },
                                    ],
                                },
                            ],
                            style: 'bullet',
                            indent: 0,
                            border: 0,
                        },
                        {
                            type: 'rich_text_section',
                            elements: [
                                {
                                    type: 'text',
                                    text: '\n',
                                },
                            ],
                        },
                        {
                            type: 'rich_text_list',
                            elements: [
                                {
                                    type: 'rich_text_section',
                                    elements: [
                                        {
                                            type: 'text',
                                            text: 'foo',
                                        },
                                    ],
                                },
                                {
                                    type: 'rich_text_section',
                                    elements: [
                                        {
                                            type: 'text',
                                            text: 'bar',
                                        },
                                    ],
                                },
                                {
                                    type: 'rich_text_section',
                                    elements: [
                                        {
                                            type: 'text',
                                            text: 'baz',
                                        },
                                    ],
                                },
                            ],
                            style: 'ordered',
                            indent: 0,
                            border: 0,
                        },
                        {
                            type: 'rich_text_section',
                            elements: [
                                {
                                    type: 'text',
                                    text: '\n',
                                },
                                {
                                    type: 'channel',
                                    channel_id: 'C07UK8KG9JQ',
                                },
                                {
                                    type: 'text',
                                    text: '\n\n',
                                },
                                {
                                    type: 'user',
                                    user_id: 'U07UVDT8XLH',
                                },
                                {
                                    type: 'text',
                                    text: '\n\n',
                                },
                                {
                                    type: 'user',
                                    user_id: 'U07UGMNHJN7',
                                },
                                {
                                    type: 'text',
                                    text: '\n\n',
                                },
                            ],
                        },
                        {
                            type: 'rich_text_preformatted',
                            elements: [
                                {
                                    type: 'text',
                                    text: 'console.log("moin meister");',
                                },
                            ],
                            border: 0,
                        },
                    ],
                },
            ] as any)
        ).toEqual({
            title: [
                {
                    type: 'rich_text',
                    block_id: 'd9X9G',
                    elements: [
                        {
                            type: 'rich_text_section',
                            elements: [
                                {
                                    type: 'text',
                                    text: 'Monday Movie Night ',
                                    style: {
                                        bold: true,
                                    },
                                },
                                {
                                    type: 'text',
                                    text: '15.12.',
                                    style: {
                                        bold: true,
                                        italic: true,
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
            description: [
                {
                    type: 'rich_text',
                    block_id: 'd9X9G',
                    elements: [
                        {
                            type: 'rich_text_section',
                            elements: [
                                {
                                    type: 'text',
                                    text: '\n\n',
                                },
                            ],
                        },
                        {
                            type: 'rich_text_quote',
                            elements: [
                                {
                                    type: 'link',
                                    url: 'https://google.com',
                                    text: "We're going to be watching ",
                                },
                                {
                                    type: 'link',
                                    url: 'https://google.com',
                                    text: 'American Psycho',
                                    style: {
                                        bold: true,
                                        italic: true,
                                    },
                                },
                                {
                                    type: 'link',
                                    url: 'https://google.com',
                                    text: ' (2000)',
                                    style: {
                                        italic: true,
                                    },
                                },
                                {
                                    type: 'text',
                                    text: '!\n\nSee you at 19:00 in Cosmos (the space with the tv next to kitchen)',
                                },
                            ],
                        },
                        {
                            type: 'rich_text_section',
                            elements: [
                                {
                                    type: 'text',
                                    text: '\n',
                                },
                                {
                                    type: 'emoji',
                                    name: 'popcorn',
                                    unicode: '1f37f',
                                },
                                {
                                    type: 'text',
                                    text: " as always, we'll also have popcorn ",
                                },
                                {
                                    type: 'emoji',
                                    name: 'slightly_smiling_face',
                                    unicode: '1f642',
                                },
                                {
                                    type: 'text',
                                    text: '\n\n',
                                },
                                {
                                    type: 'text',
                                    text: 'moin meister',
                                    style: {
                                        strike: true,
                                    },
                                },
                                {
                                    type: 'text',
                                    text: '\n\n',
                                },
                                {
                                    type: 'text',
                                    text: 'hoher',
                                    style: {
                                        code: true,
                                    },
                                },
                                {
                                    type: 'text',
                                    text: '\n\n',
                                },
                                {
                                    type: 'emoji',
                                    name: 'squirrel',
                                },
                                {
                                    type: 'text',
                                    text: '\n\n',
                                },
                            ],
                        },
                        {
                            type: 'rich_text_list',
                            elements: [
                                {
                                    type: 'rich_text_section',
                                    elements: [
                                        {
                                            type: 'text',
                                            text: 'foo',
                                        },
                                    ],
                                },
                                {
                                    type: 'rich_text_section',
                                    elements: [
                                        {
                                            type: 'text',
                                            text: 'bar',
                                        },
                                    ],
                                },
                                {
                                    type: 'rich_text_section',
                                    elements: [
                                        {
                                            type: 'text',
                                            text: 'baz',
                                        },
                                    ],
                                },
                            ],
                            style: 'bullet',
                            indent: 0,
                            border: 0,
                        },
                        {
                            type: 'rich_text_section',
                            elements: [
                                {
                                    type: 'text',
                                    text: '\n',
                                },
                            ],
                        },
                        {
                            type: 'rich_text_list',
                            elements: [
                                {
                                    type: 'rich_text_section',
                                    elements: [
                                        {
                                            type: 'text',
                                            text: 'foo',
                                        },
                                    ],
                                },
                                {
                                    type: 'rich_text_section',
                                    elements: [
                                        {
                                            type: 'text',
                                            text: 'bar',
                                        },
                                    ],
                                },
                                {
                                    type: 'rich_text_section',
                                    elements: [
                                        {
                                            type: 'text',
                                            text: 'baz',
                                        },
                                    ],
                                },
                            ],
                            style: 'ordered',
                            indent: 0,
                            border: 0,
                        },
                        {
                            type: 'rich_text_section',
                            elements: [
                                {
                                    type: 'text',
                                    text: '\n',
                                },
                                {
                                    type: 'channel',
                                    channel_id: 'C07UK8KG9JQ',
                                },
                                {
                                    type: 'text',
                                    text: '\n\n',
                                },
                                {
                                    type: 'user',
                                    user_id: 'U07UVDT8XLH',
                                },
                                {
                                    type: 'text',
                                    text: '\n\n',
                                },
                                {
                                    type: 'user',
                                    user_id: 'U07UGMNHJN7',
                                },
                                {
                                    type: 'text',
                                    text: '\n\n',
                                },
                            ],
                        },
                        {
                            type: 'rich_text_preformatted',
                            elements: [
                                {
                                    type: 'text',
                                    text: 'console.log("moin meister");',
                                },
                            ],
                            border: 0,
                        },
                    ],
                },
            ],
        });
    });
});
