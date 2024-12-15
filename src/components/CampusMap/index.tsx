import { RoomInfo, useMap } from '@/useMapData';

import { LoadingSpinner } from '../LoadingSpinner';

const grayTypes = [
    'terrace',
    'team-space',
    'learning-units',
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

function getStyles(room: RoomInfo): { fill?: string; stroke?: string } {
    if (room.children?.length) {
        // room with children is only rendered if both children are in the same state
        // if one child is booked and the other is not, the room is not rendered
        // if both are the same state, the parent gets rendered over them
        const bookedChildren = room.children?.filter((i) => i.bookedByStaff);

        if (bookedChildren.length === 0)
            return {
                fill: room.id === 'cosmos' ? 'none' : theme.room.default,
            };
        if (bookedChildren.length === room.children.length) {
            return { fill: theme.room.academicEvent };
        }
        return { fill: 'none' };
    }
    if (room.bookedByStudents) return { fill: theme.room.booked };
    if (room.bookableByStudents) return { fill: theme.room.bookable };
    if (room.bookedByStaff) return { fill: theme.room.academicEvent };
    if (room.bookableByStaff && !['cosmos-1', 'cosmos-2'].includes(room.id))
        return { fill: theme.room.onlyBookableByFaculty };

    if (grayTypes.includes(room.type)) return { fill: theme.room.default };

    return { fill: 'none' };
}

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
    const { svgString, rooms, query } = useMap();

    const isBookingMode = mode === MapDisplayMode.BOOKING;

    const isOffline = isBookingMode && query.isOffline;
    const isError = isBookingMode && query.isError;
    const isLoading = isBookingMode && query.isLoading;

    const bookingModeStyles =
        rooms
            .map((i) => {
                const { fill, stroke } = getStyles(i);

                const fillStr = fill ? `fill:${fill} !important;` : '';
                const strokeStr = stroke
                    ? `stroke:${stroke} !important;`
                    : 'stroke:none !important;';

                return `.campus-map.booking-mode [js-data-id="${i.id}"]{${fillStr}fill-opacity:1}.campus-map.booking-mode [js-data-id="${i.id}"] *{${strokeStr}fill-opacity:1}`;
            })
            .join('') +
        `.campus-map.booking-mode [js-data-id="off-limits"]{fill:none !important}`;

    return (
        <div {...rest} style={{ position: 'relative', ...rest.style }}>
            <style>
                {isBookingMode && bookingModeStyles}
                {isBookingMode &&
                    (isOffline || isError) &&
                    `.campus-map.booking-mode svg {opacity: 0.3}`}
            </style>
            <div
                style={
                    {
                        // opacity: isBookingMode && isLoading ? 0 : 1,
                    }
                }
                className={
                    'campus-map ' + (isBookingMode ? ' booking-mode' : '')
                }
                dangerouslySetInnerHTML={{ __html: svgString }}
            />
            {isBookingMode && (isOffline || isError) && (
                <div className="absolute flex items-center justify-center w-full h-full left-0 top-0">
                    <span className="px-4 py-3 font-bold text-black bg-white text-2xl uppercase">
                        {isOffline ? 'Offline' : 'Error'}
                    </span>
                </div>
            )}
            {isBookingMode && isLoading && (
                <div className="absolute flex items-center justify-center w-full h-full left-0 top-0">
                    <LoadingSpinner />
                </div>
            )}
        </div>
    );
}
