const assertEnvString = (value: unknown, key: string): string => {
    if (typeof value !== 'string')
        throw new Error('Missing string value process.env.' + key);

    return value;
};
const assertEnvArray = (value: unknown, key: string): string[] => {
    if (typeof value !== 'string')
        throw new Error('Missing array value process.env.' + key);

    return value.split(',');
};

class Env {
    public get client() {
        return {
            host: assertEnvString(
                process.env.NEXT_PUBLIC_HOST,
                'NEXT_PUBLIC_HOST'
            ),
            google: {
                clientId: assertEnvString(
                    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                    'NEXT_PUBLIC_GOOGLE_CLIENT_ID'
                ),
            },
        };
    }
    public get server() {
        return {
            redis: {
                url: assertEnvString(process.env.REDIS_URL, 'REDIS_URL'),
            },
            host: assertEnvString(
                process.env.NEXT_PUBLIC_HOST,
                'NEXT_PUBLIC_HOST'
            ),
            google: {
                clientId: assertEnvString(
                    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                    'NEXT_PUBLIC_GOOGLE_CLIENT_ID'
                ),
                clientSecret: assertEnvString(
                    process.env.GOOGLE_CLIENT_SECRET,
                    'GOOGLE_CLIENT_SECRET'
                ),
            },
            slack: {
                token: assertEnvString(
                    process.env.SLACK_APP_TOKEN,
                    'SLACK_APP_TOKEN'
                ),
                channelId: assertEnvString(
                    process.env.SLACK_CHANNEL_ID,
                    'SLACK_CHANNEL_ID'
                ),
                adminUserIds: assertEnvArray(
                    process.env.SLACK_ADMIN_USER_IDS,
                    'SLACK_ADMIN_USER_IDS'
                ),
            },
        };
    }
}
export const env = new Env();
