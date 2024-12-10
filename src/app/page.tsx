'use client';

import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useEffect, useState } from 'react';

import ProgressBar from '@/components/ProgressBar/index';
import { CalendarEvent, Google, RoomSchedule } from '@/google';
import { useInterval } from '@/hooks/useInterval';
import { isRoom, MapEl, roomMatchesGoogleLocation } from '@/map/mapElements';
import { parseFloorplanInfoFromSvg } from '@/map/parsing';

const SLIDE_DURATION_MS = 10000;

dayjs.extend(isBetween);

const GoogleCalendar = {
    CODE_COMMUNITY: {
        id: 'code.berlin_crt6693rdcpdrrsjlg7gci4qok@group.calendar.google.com',
    },
    CODE_LEARNING_PLATFORM: {
        id: 'ouie6tb18va07eghq2f2e295t9bb7ale@import.calendar.google.com',
    },
};

export default function Page() {
    const [mapMode, setMapMode] = useState<'map' | 'booking'>('booking');

    useInterval(() => {
        setMapMode(mapMode === 'map' ? 'booking' : 'map');
    }, SLIDE_DURATION_MS);

    const [mapData, setMapData] = useState<{
        str: string;
        data: MapEl[];
    } | null>(null);
    const [roomSchedules, setRoomSchedules] = useState<{
        calendars: Record<string, RoomSchedule>;
    } | null>(null);

    const [calendarEvents, setCalendarEvents] = useState<
        CalendarEvent[] | null
    >(null);

    useEffect(() => {
        const google = Google.fromBrowserCookies();

        (async () => {
            const rawSvgRes = await fetch('/floorplan.svg');

            const rawSvg = await rawSvgRes.text();

            const info = parseFloorplanInfoFromSvg(rawSvg);

            setMapData(info);

            const googleRoomIds = info.data
                .filter(isRoom)
                .map((i) => i.google)
                .filter(Boolean) as string[];

            setRoomSchedules(await google.roomSchedules.get(googleRoomIds));
        })();
        (async () => {
            setCalendarEvents(
                await google.calendarEvents.get([
                    GoogleCalendar.CODE_COMMUNITY.id,
                    GoogleCalendar.CODE_LEARNING_PLATFORM.id,
                ])
            );
        })();
    }, []);

    if (!roomSchedules || !mapData || !calendarEvents) return null;

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

    const grayTypes = [
        'terrace',
        'team-space',
        'learning-units',
        'open-space',
        'meetings',
        'meditation',
        'project',
        'makers-space',
        'workspace',
        'music-studio',
        'hidden',
        'elevators',
        'restrooms',
        'stairwell',
    ];

    const bookingModeStyles = (
        <>
            {`[js-data-id="off-limits"]{fill:none !important} [js-data-google-name]{fill:#333 !important} [js-data-google-name] *{stroke:none}`}
            {grayTypes
                .map(
                    (i) =>
                        `[js-data-type="${i}"]:not([js-data-google-name]){fill:#111 !important;stroke:none;} [js-data-type="${i}"]:not([js-data-google-name]) *{stroke:none;}`
                )
                .join('')}
            {availableRoomIds
                .map(
                    (i) =>
                        `[js-data-id="${i}"]{fill:#24D366 !important}[js-data-id="${i}"] *{stroke:none}`
                )
                .join('')}
            {bookedRoomIds
                .map(
                    (i) =>
                        `[js-data-id="${i}"]{fill:#FB5061 !important}[js-data-id="${i}"] *{stroke:none}`
                )
                .join('')}
            {roomsWithCurrentEvents
                .map(
                    (i) =>
                        `[js-data-id="${i}"]{fill:#A791FF !important}[js-data-id="${i}"] *{stroke:none}`
                )
                .join('')}
        </>
    );

    return (
        <>
            <style>{mapMode === 'booking' && bookingModeStyles}</style>
            <ProgressBar
                step={['map', 'booking'].indexOf(mapMode)}
                numSteps={2}
                fillDurationMs={SLIDE_DURATION_MS}
                style={{
                    width: '80%',
                    margin: '2rem auto',
                    gap: '10rem',
                }}
            />
            <div
                dangerouslySetInnerHTML={{ __html: mapData.str }}
                style={{
                    height: '80vh',
                }}
            />
        </>
    );
}
