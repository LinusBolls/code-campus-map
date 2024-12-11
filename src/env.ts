const assertEnvString = (value: unknown, key: string): string => {
    if (typeof value !== 'string')
        throw new Error('Missing string value process.env.' + key);

    return value;
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
        };
    }
}
export const env = new Env();
