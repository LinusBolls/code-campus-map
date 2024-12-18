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
        white: '#fff',
        bg: '#000',
        terraceOutline: '#ccc',
        roomSecondary: '#adadad',
        labelHighContrast: '#555',
        roomDefault: '#111',

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

export function getMapModeStyles(room: RoomInfo) {
    return room.parent || ['cantina', 'cosmos'].includes(room.id)
        ? { style: { fill: 'none', stroke: 'none' } }
        : mapTheme[room.type as keyof typeof mapTheme];
}

const theme = {
    room: {
        bookable: '#24D366',
        booked: '#FB5061',
        academicEvent: '#4B99D2',
        onlyBookableByFaculty: '#111',
    },
};

export function getBookingModeStyles(room: RoomInfo) {
    const palette = bookingModePalette.light;

    if (room.children?.length) {
        // room with children is only rendered if both children are in the same state
        // if one child is booked and the other is not, the room is not rendered
        // if both are the same state, the parent gets rendered over them
        const bookedChildren = room.children?.filter((i) => i.bookedByStaff);

        if (bookedChildren.length === 0)
            return {
                style: {
                    fill: room.id === 'cosmos' ? 'none' : palette.roomDefault,
                },
            };
        if (bookedChildren.length === room.children.length) {
            return { style: { fill: theme.room.academicEvent } };
        }
        return { style: { fill: 'none' } };
    }
    if (room.bookedByStudents)
        return {
            style: { fill: theme.room.booked, stroke: 'none' },
        };
    if (room.bookableByStudents)
        return {
            style: { fill: theme.room.bookable, stroke: 'none' },
        };
    if (room.bookedByStaff)
        return {
            style: {
                fill: theme.room.academicEvent,
                stroke: 'none',
            },
        };
    if (room.bookableByStaff && !['cosmos-1', 'cosmos-2'].includes(room.id))
        return {
            style: {
                fill: theme.room.onlyBookableByFaculty,
                stroke: 'none',
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
                fill: palette.roomDefault,
                stroke: 'none',
                'fill-opacity': 1,
            },
            label: {
                style: {
                    color: palette.white,
                },
            },
        };
    }
    if (['subtenant', 'elevators', 'restrooms'].includes(room.type)) {
        return {
            style: {
                fill: 'none',
                stroke: palette.roomSecondary,
            },
            label: {
                style: {
                    fill: palette.roomSecondary,
                },
            },
        };
    }

    if (['terrace'].includes(room.type)) {
        return {
            style: {
                fill: palette.white,
                stroke: palette.terraceOutline,
                'stroke-width': 5,
            },
            label: {
                style: {
                    fill: palette.labelHighContrast,
                },
            },
        };
    }

    if (['project', 'open-space'].includes(room.type)) {
        return {
            style: { fill: 'none', stroke: 'none' },
            label: { style: { fill: palette.roomSecondary } },
        };
    }

    if (['hidden'].includes(room.type)) {
        return {
            style: {
                fill: palette.roomSecondary,
            },
            label: {
                style: { fill: palette.labelHighContrast },
            },
        };
    }
    if (['floor'].includes(room.type)) {
        return { style: { fill: palette.bg } };
    }
    if (['stairwell'].includes(room.type)) {
        return {
            style: { fill: palette.roomSecondary },
        };
    }
    return {
        style: { fill: 'red' },
    };
}
