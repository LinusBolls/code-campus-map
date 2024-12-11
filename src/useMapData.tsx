import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { Config } from './config';
import { Google } from './google';
import { GoogleCalendar } from './google.data';
import { isRoom, roomMatchesGoogleLocation } from './map/mapElements';
import { parseFloorplanInfoFromSvg } from './map/parsing';

export default function useMapData() {
    const mapDataQuery = useQuery({
        queryKey: ['mapData'],
        queryFn: async () => {
            const rawSvgRes = await fetch('/floorplan.svg');

            const rawSvg = await rawSvgRes.text();

            return parseFloorplanInfoFromSvg(rawSvg);
        },
    });
    const roomSchedulesQuery = useQuery({
        queryKey: ['roomSchedules'],
        queryFn: async () => {
            const google = Google.fromBrowserCookies();

            const googleRoomIds = mapDataQuery
                .data!.data.filter(isRoom)
                .map((i) => i.google)
                .filter(Boolean) as string[];

            return google.roomSchedules.get(googleRoomIds);
        },
        enabled: mapDataQuery.data != null,
        refetchInterval: Config.ROOM_SCHEDULES_REFETCH_INTERVAL,
    });
    const calendarEventsQuery = useQuery({
        queryKey: ['calendarEvents'],
        queryFn: async () => {
            const google = Google.fromBrowserCookies();

            return google.calendarEvents.get([
                GoogleCalendar.CODE_COMMUNITY.id,
                GoogleCalendar.CODE_LEARNING_PLATFORM.id,
            ]);
        },
        refetchInterval: Config.CALENDAR_EVENTS_REFETCH_INTERVAL,
    });

    return {
        mapData: mapDataQuery.data,
        roomSchedules: roomSchedulesQuery.data,
        calendarEvents: calendarEventsQuery.data,
        svgStr: mapDataQuery.data?.str,
    };
}

export function useMap() {
    const { mapData, roomSchedules, calendarEvents } = useMapData();

    if (!roomSchedules || !mapData || !calendarEvents)
        return {
            availableRoomIds: null,
            bookedRoomIds: null,
            roomsWithCurrentEvents: null,
        };

    const availableRoomIds = mapData.data
        .filter(isRoom)
        .filter((i) => i.google)
        .map((i) => i.id);

    const bookedRoomIds = mapData.data
        .filter(isRoom)
        .filter((i) => {
            if (!i.google) return false;

            const schedule = roomSchedules.calendars[i.google!].busy;

            const isCurrentlyBooked = schedule.some((i) => {
                const start = dayjs(i.start);
                const end = dayjs(i.end);

                return dayjs().isBetween(start, end);
            });
            return isCurrentlyBooked;
        })
        .map((i) => i.id);

    const roomsWithCurrentEvents = mapData.data
        .filter(isRoom)
        .filter((room) => {
            const events = calendarEvents.filter((event) =>
                roomMatchesGoogleLocation(event.location, room)
            );
            return events.length > 0;
        })
        .map((i) => i.id);

    return {
        availableRoomIds,
        bookedRoomIds,
        roomsWithCurrentEvents,
        svgString: mapData.str,
    };
}
