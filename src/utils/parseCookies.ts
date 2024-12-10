export const parseCookies = (
    cookies = document.cookie
): Record<string, string> => {
    return cookies.split('; ').reduce((acc: Record<string, string>, cookie) => {
        const [key, value] = cookie.split('=');
        acc[decodeURIComponent(key)] = decodeURIComponent(value);
        return acc;
    }, {});
};
