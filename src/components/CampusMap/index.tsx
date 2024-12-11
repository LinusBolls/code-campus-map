import { useMap } from '@/useMapData';

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

const theme = {
    room: {
        default: '#111',
        bookable: '#24D366',
        booked: '#FB5061',
        academicEvent: '#4B99D2',
        onlyBookableByFaculty: '#111',
    },
};

export enum MapDisplayMode {
    MAP = 'map',
    BOOKING = 'booking',
}

export interface CampusMapProps extends React.HTMLAttributes<HTMLDivElement> {
    mode?: MapDisplayMode;
    mapId?: string;
}
export default function CampusMap({
    mode = MapDisplayMode.MAP,
    ...rest
}: CampusMapProps) {
    const {
        svgString,
        availableRoomIds,
        bookedRoomIds,
        roomsWithCurrentEvents,
    } = useMap();

    if (!availableRoomIds || !bookedRoomIds || !roomsWithCurrentEvents)
        return null;

    const bookingModeStyles = (
        <>
            {`[js-data-id="off-limits"]{fill:none !important} [js-data-google-name]{fill:${theme.room.onlyBookableByFaculty} !important} [js-data-google-name] *{stroke:none}`}
            {grayTypes
                .map(
                    (i) =>
                        `[js-data-type="${i}"]:not([js-data-google-name]){fill:${theme.room.default} !important;stroke:none;} [js-data-type="${i}"]:not([js-data-google-name]) *{stroke:none;}`
                )
                .join('')}
            {availableRoomIds
                .map(
                    (i) =>
                        `[js-data-id="${i}"]{fill:${theme.room.bookable} !important}[js-data-id="${i}"] *{stroke:none}`
                )
                .join('')}
            {bookedRoomIds
                .map(
                    (i) =>
                        `[js-data-id="${i}"]{fill:${theme.room.booked} !important}[js-data-id="${i}"] *{stroke:none}`
                )
                .join('')}
            {roomsWithCurrentEvents
                .map(
                    (i) =>
                        `[js-data-id="${i}"]{fill:${theme.room.academicEvent} !important}[js-data-id="${i}"] *{stroke:none}`
                )
                .join('')}
        </>
    );

    return (
        <>
            <style>
                {mode === MapDisplayMode.BOOKING && bookingModeStyles}
            </style>
            <div dangerouslySetInnerHTML={{ __html: svgString }} {...rest} />
        </>
    );
}
