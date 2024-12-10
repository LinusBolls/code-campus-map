import dayjs from 'dayjs';

export type RoomSchedule = { busy: { start: string; end: string }[] };

export async function fetchGoogleRoomSchedules(
    accessToken: string,
    roomIds: string[],
    after: Date | dayjs.Dayjs = dayjs().startOf('day'),
    before: Date | dayjs.Dayjs = dayjs().endOf('day').add(7, 'days')
): Promise<{ calendars: Record<string, RoomSchedule> }> {
    const res = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'accept-encoding': 'gzip',
        },
        body: JSON.stringify({
            items: roomIds.map((id) => ({ id })),
            timeMin: after,
            timeMax: before,
        }),
    });
    const data = await res.json();

    return data;
}
