import dayjs from 'dayjs';

export async function fetchGoogleCalendarEvents(
    accessToken: string,
    calendarIds: string[],
    after: Date | dayjs.Dayjs = dayjs().startOf('day'),
    before: Date | dayjs.Dayjs = dayjs().endOf('day').add(7, 'days')
): Promise<CalendarEvent[]> {
    const eventRequests = calendarIds.map((calendarId) =>
        fetch(
            `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
                calendarId
            )}/events?timeMin=${after.toISOString()}&timeMax=${before.toISOString()}&singleEvents=true&orderBy=startTime`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'accept-encoding': 'gzip',
                },
            }
        ).then((res) => res.json())
    );
    const allEvents = await Promise.all(eventRequests);

    const combinedEvents = allEvents.flatMap(
        (calendar) => calendar.items || []
    );

    return combinedEvents;
}

export interface CalendarEvent {
    summary: string;
    location?: string;
    creator: {
        email: string;
    };
    organizer: {
        displayName: string;
    };
    start: {
        dateTime: string;
        timeZone: string;
    };
    end: {
        dateTime: string;
        timeZone: string;
    };
    status: 'confirmed';
    transparency?: 'transparent';
    attendees?: {
        email: string;
        displayName?: string;
        resource?: boolean;
        responseStatus?: 'declined' | 'accepted' | 'needsAction';
    }[];
}
