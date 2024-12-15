import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { Config } from './config';
import { Google } from './google';
import { GoogleCalendar } from './google.data';
import { isRoom, roomMatchesGoogleEvent } from './map/mapElements';
import { parseFloorplanInfoFromSvg } from './map/parsing';
import { svgString } from './map/svgString';

export default function useMapData() {
    const mapData = parseFloorplanInfoFromSvg(svgString);

    const roomSchedulesQuery = useQuery({
        queryKey: ['roomSchedules'],
        queryFn: async () => {
            const google = Google.fromBrowserCookies();

            const googleRoomIds = mapData.data
                .filter(isRoom)
                .map((i) => i.google)
                .filter(Boolean) as string[];

            return google.roomSchedules.get(googleRoomIds);
        },
        refetchInterval: Config.ROOM_SCHEDULES_REFETCH_INTERVAL,
    });
    const calendarEventsQuery = useQuery({
        queryKey: ['calendarEvents'],
        queryFn: async () => {
            const google = Google.fromBrowserCookies();

            return google.calendarEvents.get([
                GoogleCalendar.CODE_COMMUNITY.id,
                GoogleCalendar.CODE_LEARNING_PLATFORM.id,
                GoogleCalendar.CODE_OS.id,
            ]);
        },
        refetchInterval: Config.CALENDAR_EVENTS_REFETCH_INTERVAL,
    });
    const isLoading =
        roomSchedulesQuery.isLoading || calendarEventsQuery.isLoading;
    const isError = roomSchedulesQuery.isError || calendarEventsQuery.isError;
    const isOffline = roomSchedulesQuery.isError && calendarEventsQuery.isError;

    return {
        mapData,
        roomSchedules: roomSchedulesQuery.data,
        calendarEvents: calendarEventsQuery.data,
        query: {
            isLoading,
            isError,
            isOffline,
        },
    };
}

export interface RoomInfo {
    id: string;
    parent?: RoomInfo;
    children?: RoomInfo[];

    bookableByStudents: boolean;
    bookedByStudents: boolean;
    bookableByStaff: boolean;
    bookedByStaff: boolean;

    type: string;
}

export function useMap() {
    const { mapData, roomSchedules, calendarEvents, query } = useMapData();

    const bookedRoomIds = mapData.data
        .filter(isRoom)
        .filter((i) => {
            if (!i.google || !roomSchedules) return false;

            const schedule = roomSchedules.calendars[i.google]?.busy;

            if (!schedule) {
                console.warn(
                    '[useMap] No schedule for room:',
                    i.google,
                    roomSchedules.calendars
                );
                return false;
            }
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
            if (!calendarEvents) return false;

            const events = calendarEvents.filter(
                (event) =>
                    roomMatchesGoogleEvent(event, room) &&
                    dayjs(event.start.dateTime).isBefore(dayjs()) &&
                    dayjs(event.end.dateTime).isAfter(dayjs())
            );
            return events.length > 0;
        })
        .map((i) => i.id);

    const rooms =
        mapData.data.filter(isRoom).map<RoomInfo>((i) => {
            return {
                id: i.id,
                type: i.type,
                bookableByStudents: i.google != null,
                bookedByStudents: bookedRoomIds.includes(i.id),
                bookableByStaff: i.googleName != null,
                bookedByStaff: roomsWithCurrentEvents.includes(i.id),
            };
        }) ?? [];

    for (const room of rooms) {
        const parent = mapData.data
            .filter(isRoom)
            .find((i) => i.id === room.id)?.parent;
        if (parent) {
            const parentRoom = rooms.find((i) => i.id === parent);
            if (parentRoom) {
                if (!parentRoom.children) {
                    parentRoom.children = [];
                }
                parentRoom.children.push(room);
            }
        }
    }

    return {
        svgString: mapData.str,
        rooms,
        query,
    };
}

export function usePrefetchMapData() {
    useMap();
}
