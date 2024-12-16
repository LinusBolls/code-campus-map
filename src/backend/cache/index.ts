import { MessageElement } from '@slack/web-api/dist/types/response/ConversationsRepliesResponse';
import { commandOptions, createClient } from 'redis';

import { env } from '@/env';

export type FileResponse = {
    headers: Record<string, string>;
    buffer: ArrayBuffer | null;
};

class Cache {
    public getConnectionState = async (): Promise<{
        ok: boolean;
        error?: string;
    }> => {
        try {
            await this.redis.ping();
            return {
                ok: true,
            };
        } catch (err) {
            return {
                ok: false,
                error: (err as Error).message ?? 'Unknown error',
            };
        }
    };
    constructor(
        private redis = createClient({
            url: env.server.redis.url,
        })
    ) {
        this.connect();
    }

    private async connect() {
        this.redis.on('error', (err) => {
            console.error('[cache] redis error:', err);
        });
        await this.redis.connect();
    }

    public slack = {
        emoji: {
            get: async () => {
                return JSON.parse(
                    (await this.redis.get('slack:emoji')) || 'null'
                );
            },
            set: async (emoji: Record<string, string>) => {
                await this.redis.set('slack:emoji', JSON.stringify(emoji), {
                    EX: 60,
                });
            },
        },
        users: {
            get: async (userId: string) => {
                return JSON.parse(
                    (await this.redis.get(`slack:user:${userId}`)) || 'null'
                );
            },
            set: async (
                userId: string,
                user: { name: string; color: string }
            ) => {
                await this.redis.set(
                    `slack:user:${userId}`,
                    JSON.stringify(user),
                    { EX: 60 }
                );
            },
        },
        channels: {
            get: async (channelId: string) => {
                return JSON.parse(
                    (await this.redis.get(`slack:channel:${channelId}`)) ||
                        'null'
                );
            },
            set: async (channelId: string, channel: { name: string }) => {
                await this.redis.set(
                    `slack:channel:${channelId}`,
                    JSON.stringify(channel),
                    { EX: 60 }
                );
                await this.redis.expire(`slack:channel:${channelId}`, 10);
            },
        },
        files: {
            get: async (fileId: string): Promise<FileResponse | null> => {
                const bufferRes = await this.redis.hGetAll(
                    commandOptions({ returnBuffers: true }),
                    `slack:file-data:${fileId}`
                );

                const buffer = bufferRes?.buffer?.buffer as ArrayBuffer;

                const info: { headers: Record<string, string> } = JSON.parse(
                    (await this.redis.get(`slack:file:${fileId}`)) || 'null'
                );
                if (!buffer || !info) return null;

                return { ...info, buffer };
            },
            set: async (fileId: string, file: FileResponse) => {
                await this.redis.hSet(
                    `slack:file-data:${fileId}`,
                    'buffer',
                    Buffer.from(file.buffer!)
                );
                await this.redis.set(
                    `slack:file:${fileId}`,
                    JSON.stringify({ headers: file.headers })
                );
            },
        },
        publishedPosts: {
            get: async () => {
                return JSON.parse(
                    (await this.redis.get('slack:publishedPosts')) || 'null'
                );
            },
            set: async (posts: MessageElement[]) => {
                await this.redis.set(
                    'slack:publishedPosts',
                    JSON.stringify(posts),
                    {
                        EX: 60,
                    }
                );
            },
        },
    };
}
export const cache = new Cache();
