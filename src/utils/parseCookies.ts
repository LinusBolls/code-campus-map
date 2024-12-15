import { Google } from '@/google';

type CookieName =
    | 'google:code-connect:access-token'
    | 'google:code-connect:expires-at'
    | 'google:code-connect:refresh-token';

const parseCookies = (
    cookies = document.cookie
): Record<CookieName, string | undefined> => {
    return cookies.split('; ').reduce((acc: Record<string, string>, cookie) => {
        const [key, value] = cookie.split('=');
        acc[decodeURIComponent(key)] = decodeURIComponent(value);
        return acc;
    }, {});
};

export function useClientSideGoogleAuth() {
    const accessToken = parseCookies()['google:code-connect:access-token'];
    const refreshToken = parseCookies()['google:code-connect:refresh-token'];
    const expiresAt = parseCookies()['google:code-connect:expires-at'];

    const isAuthenticated = !!accessToken;

    const loginUrl = Google.getAuthUrl();

    return { isAuthenticated, accessToken, refreshToken, expiresAt, loginUrl };
}
