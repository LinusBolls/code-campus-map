const assertEnvString = (value: unknown): string => {
    if (typeof value !== 'string')
        throw new Error('Missing string value process.env.' + name);

    return value;
};

class Env {
    public get client() {
        return {
            host: assertEnvString(process.env.NEXT_PUBLIC_HOST),
            google: {
                clientId: assertEnvString(
                    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
                ),
            },
        };
    }
    public get server() {
        return {
            host: assertEnvString(process.env.NEXT_PUBLIC_HOST),
            google: {
                clientId: assertEnvString(
                    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
                ),
                clientSecret: assertEnvString(process.env.GOOGLE_CLIENT_SECRET),
            },
        };
    }
}
export const env = new Env();
