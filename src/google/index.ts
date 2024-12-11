import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import { env } from '@/env';
import { parseCookies } from '@/utils/parseCookies';

import { fetchGoogleCalendarEvents } from './calendarEvents';
import { fetchGoogleRoomSchedules } from './roomSchedules';

export type { RoomSchedule } from './roomSchedules';
export type { CalendarEvent } from './calendarEvents';

dayjs.extend(isBetween);

export class Google {
    constructor(
        private accessToken: string,
        private refreshToken?: string,
        private expiresAt?: Date | dayjs.Dayjs
    ) {}

    public roomSchedules = {
        get: (async (roomIds: string[]) => {
            await this.tryToRefreshAcessToken();
            return await fetchGoogleRoomSchedules(this.accessToken, roomIds);
        }).bind(this),
    };
    public calendarEvents = {
        get: (async (calendarIds: string[]) => {
            await this.tryToRefreshAcessToken();
            return await fetchGoogleCalendarEvents(
                this.accessToken,
                calendarIds
            );
        }).bind(this),
    };
    public static fromBrowserCookies() {
        if (typeof window === 'undefined') {
            throw new Error(
                'Google.fromBrowserCookies: Cannot read cookies in non-browser environment'
            );
        }
        const accessToken = parseCookies()['google:code-connect:access-token'];
        const refreshToken =
            parseCookies()['google:code-connect:refresh-token'];
        const expiresAt = parseCookies()['google:code-connect:expires-at'];
        if (!accessToken) {
            window.location.href = Google.getAuthUrl();
        }
        return new Google(accessToken, refreshToken, dayjs(expiresAt));
    }
    public static getAuthUrl() {
        const clientId = env.client.google.clientId;
        const redirectUri =
            env.client.host + '/api/google-auth/code-connect/callback';

        const scope = 'https://www.googleapis.com/auth/calendar';

        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;

        return googleAuthUrl;
    }

    public shouldRefreshAccessToken() {
        if (!this.expiresAt) {
            return false;
        }
        const now = dayjs();

        return (
            now.isBetween(
                dayjs(this.expiresAt).subtract(1, 'minutes'),
                this.expiresAt
            ) || now.isAfter(this.expiresAt)
        );
    }
    public tryToRefreshAcessToken() {
        if (this.shouldRefreshAccessToken()) {
            return this.refreshAccessToken();
        }
    }

    public async refreshAccessToken() {
        if (typeof window !== 'undefined') {
            const res = await fetch(
                '/api/google-auth/code-connect/refresh-token',
                {
                    method: 'POST',
                }
            );
            const { accessToken, expiresAt } = await res.json();

            this.accessToken = accessToken;
            this.expiresAt = expiresAt;

            return;
        }
        throw new Error(
            "Google.refreshAccessToken: Can't refresh token in non-browser environment"
        );
    }
}
