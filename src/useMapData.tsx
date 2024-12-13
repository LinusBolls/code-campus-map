import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { Config } from './config';
import { Google } from './google';
import { GoogleCalendar } from './google.data';
import { isRoom, roomMatchesGoogleEvent } from './map/mapElements';
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
                GoogleCalendar.CODE_OS.id,
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
        mapData?.data.filter(isRoom).map<RoomInfo>((i) => {
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
        availableRoomIds,
        bookedRoomIds,
        roomsWithCurrentEvents,
        svgString: mapData.str,
        rooms,
    };
}
