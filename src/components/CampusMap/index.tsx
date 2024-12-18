import { useMap } from '@/useMapData';
import { useIsOnline } from '@/utils/useIsOnline';

import { LoadingSpinner } from '../LoadingSpinner';
import { Map, MapRoomStyles } from './Map';
import { getBookingModeStyles, getMapModeStyles } from './mapTheme';

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
    const { rooms, query } = useMap();

    const isBookingMode = mode === MapDisplayMode.BOOKING;

    const isOffline = !useIsOnline();
    const isError = isBookingMode && query.isError;
    const isLoading = isBookingMode && query.isLoading;

    const roomStyles = rooms.reduce<MapRoomStyles>((acc, room) => {
        if (isBookingMode) {
            acc[room.id] = getBookingModeStyles(room);
        } else {
            acc[room.id] = getMapModeStyles(room);
        }
        return acc;
    }, {});

    return (
        <div
            {...rest}
            style={{ position: 'relative', height: '100%', ...rest.style }}
        >
            <Map
                rooms={roomStyles}
                style={{
                    opacity: isOffline || isError ? 0.3 : undefined,
                }}
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
