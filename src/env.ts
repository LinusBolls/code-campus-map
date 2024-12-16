const assertEnvEnum = (value: unknown, key: string, enumValues: string[]) => {
    if (typeof value !== 'string')
        throw new Error('Missing enum value process.env.' + key);

    if (!enumValues.includes(value))
        throw new Error(
            'Invalid enum value process.env.' +
                key +
                '. Expected one of: ' +
                enumValues.join(', ')
        );

    return value;
};

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
            nodeEnv: assertEnvEnum(process.env.NODE_ENV, 'NODE_ENV', [
                'development',
                'staging',
                'production',
            ]) as 'development' | 'staging' | 'production',
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
            nodeEnv: assertEnvEnum(process.env.NODE_ENV, 'NODE_ENV', [
                'development',
                'staging',
                'production',
            ]) as 'development' | 'staging' | 'production',
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
