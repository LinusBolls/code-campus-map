import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

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
        get: (async (roomIds: string[]) =>
            fetchGoogleRoomSchedules(this.accessToken, roomIds)).bind(this),
    };
    public calendarEvents = {
        get: (async (calendarIds: string[]) =>
            fetchGoogleCalendarEvents(this.accessToken, calendarIds)).bind(
            this
        ),
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
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

        const scope = 'https://www.googleapis.com/auth/calendar';

        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;

        return googleAuthUrl;
    }
}
