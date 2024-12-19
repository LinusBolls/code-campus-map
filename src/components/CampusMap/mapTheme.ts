import { RoomInfo } from '@/useMapData';

const bookingModePalette = {
    light: {
        white: '#fff',
        bg: '#f1f1f1',
        terraceOutline: '#ccc',
        roomSecondary: '#adadad',
        labelHighContrast: '#555',
        roomDefault: '#111',

        bookable: '#77DC92',
        booked: '#F45865',
        academicEvent: '#4B99D2',
    },
    dark: {
        white: '#000',
        bg: '#131313',
        terraceOutline: '#555',
        roomSecondary: '#666',
        labelHighContrast: '#ddd',
        roomDefault: '#fff',

        bookable: '#77DC92',
        booked: '#F45865',
        academicEvent: '#4B99D2',
    },
};

export const mapTheme = {
    floor: {
        style: { fill: '#000', stroke: 'none' },
        label: { style: { fill: '#fff' } },
    },
    terrace: {
        style: { fill: '#fff', stroke: '#ccc', 'stroke-width': 5 },
        label: { style: { fill: '#222' } },
    },
    'team-space': {
        style: { fill: '#E5AB52', stroke: 'none' },
        label: { style: { fill: '#fff' } },
    },
    'learning-units': {
        style: { fill: '#45658B', stroke: 'none' },
        label: { style: { fill: '#fff' } },
    },
    'open-space': {
        style: { fill: 'none', stroke: '#CF85EC', 'stroke-width': 5 },
        label: { style: { fill: '#fff' } },
    },
    meetings: {
        style: { fill: 'none', stroke: '#EB5574', 'stroke-width': 5 },
        label: { style: { fill: '#fff' } },
    },
    meditation: {
        style: { fill: '#4F9B8F', stroke: 'none' },
        label: { style: { fill: '#fff' } },
    },
    project: {
        style: { fill: '', stroke: '' },
        label: { style: { fill: '#fff' } },
    },
    'makers-space': {
        style: { fill: '#EB5574', stroke: 'none' },
        label: { style: { fill: '#fff' } },
    },
    workspace: {
        style: { fill: '#7C7C7C', stroke: 'none' },
        label: { style: { fill: '#fff' } },
    },
    'music-studio': {
        style: { fill: '#333', stroke: 'none' },
        label: { style: { fill: '#fff' } },
    },
    subtenant: {
        style: { fill: 'none', stroke: '#222', 'stroke-width': 5 },
        // label: { style: { fill: '#fff' } },
    },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getMapModeStyles(room: RoomInfo, theme: 'light' | 'dark') {
    return room.parent || ['cantina', 'cosmos'].includes(room.id)
        ? { style: { fill: 'none', stroke: 'none' } }
        : mapTheme[room.type as keyof typeof mapTheme];
}

export function getBookingModeStyles(
    room: RoomInfo,
    themeId: 'light' | 'dark'
) {
    const theme = bookingModePalette[themeId];

    if (room.children?.length) {
        // room with children is only rendered if both children are in the same state
        // if one child is booked and the other is not, the room is not rendered
        // if both are the same state, the parent gets rendered over them
        const bookedChildren = room.children?.filter((i) => i.bookedByStaff);

        if (bookedChildren.length === 0)
            return {
                style: {
                    fill: room.id === 'cosmos' ? 'none' : theme.roomDefault,
                },
                label: {
                    style: {
                        fill:
                            room.id === 'cosmos'
                                ? theme.roomSecondary
                                : theme.white,
                    },
                },
            };
        if (bookedChildren.length === room.children.length) {
            return { style: { fill: theme.academicEvent } };
        }
        return { style: { fill: 'none' } };
    }
    if (room.bookedByStudents)
        return {
            style: { fill: theme.booked, stroke: 'none' },
        };
    if (room.bookableByStudents)
        return {
            style: { fill: theme.bookable, stroke: 'none' },
        };
    if (room.bookedByStaff)
        return {
            style: {
                fill: theme.academicEvent,
                stroke: 'none',
            },
        };
    if (room.bookableByStaff && !['cosmos-1', 'cosmos-2'].includes(room.id))
        return {
            style: {
                fill: theme.roomDefault,
                stroke: 'none',
            },
            label: {
                style: {
                    fill: theme.white,
                },
            },
        };

    if (
        [
            'team-space',
            'learning-units',
            'meetings',
            'workspace',
            'makers-space',
            'meditation',
            'music-studio',
        ].includes(room.type)
    ) {
        return {
            style: {
                fill: theme.roomDefault,
                stroke: 'none',
                'fill-opacity': 1,
            },
            label: {
                style: {
                    fill: theme.white,
                },
            },
        };
    }
    if (['subtenant', 'elevators', 'restrooms'].includes(room.type)) {
        return {
            style: {
                fill: 'none',
                stroke: theme.roomSecondary,
                'stroke-width': 1,
            },
            label: {
                style: {
                    fill: theme.roomSecondary,
                },
            },
        };
    }

    if (['terrace'].includes(room.type)) {
        return {
            style: {
                fill: theme.white,
                stroke: theme.terraceOutline,
                'stroke-width': 5,
            },
            label: {
                style: {
                    fill: theme.labelHighContrast,
                },
            },
        };
    }

    if (['project', 'open-space'].includes(room.type)) {
        return {
            style: { fill: 'none', stroke: 'none' },
            label: { style: { fill: theme.roomSecondary } },
        };
    }

    if (['hidden'].includes(room.type)) {
        return {
            style: {
                fill: theme.roomSecondary,
            },
            label: {
                style: { fill: theme.labelHighContrast },
            },
        };
    }
    if (['floor'].includes(room.type)) {
        return { style: { fill: theme.bg } };
    }
    if (['stairwell'].includes(room.type)) {
        return {
            style: { fill: theme.roomSecondary },
        };
    }
    return {
        style: { fill: 'red' },
    };
}

export const mapModeLegend = [
    {
        stroke: '',
        label: 'Meetings',
    },
    {
        fill: '',
        label: 'Workspaces',
    },
    {
        fill: '',
        label: 'Terrace, Balcony',
    },
    {
        fill: '',
        label: 'Team Spaces',
    },
    {
        fill: '',
        label: 'Learning Units',
    },
    {
        fill: '',
        label: 'Studio, Makers space',
    },
    {
        fill: '',
        label: 'Meditation Space',
    },
    {
        stroke: '',
        label: 'Project',
    },
    {
        stroke: '',
        label: 'Open Meeting Space',
    },
    {
        stroke: '',
        label: 'Rented Out',
    },
];

export const bookingModeLegend = [
    {
        fill: bookingModePalette.light.bookable,
        label: 'Available',
    },
    {
        fill: bookingModePalette.light.booked,
        label: 'Booked by Student',
    },
    {
        fill: bookingModePalette.light.academicEvent,
        label: 'LU or Event',
    },
];
