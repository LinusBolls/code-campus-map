import { z } from 'zod';

import { CalendarEvent } from '@/google';

export const isLabel = (el: MapEl): el is LabelEl => 'label' in el;
export const isRoom = (el: MapEl): el is RoomEl => 'id' in el;

export const ALLOWED_ROOM_TYPES = [
    'floor',
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
    'subtenant',
] as const;

export const LabelElSchema = z.object({
    label: z.string(),
});
export const RoomElSchema = z.object({
    id: z.string(),
    type: z.enum(ALLOWED_ROOM_TYPES),
    name: z.string().optional(),
    google: z.string().optional(),
    rooms: z.array(z.string()).optional(),
    parent: z.string().optional(),
    googleName: z.string().optional(),
    subtenant: z.string().optional(),
});
export const ElSchema = z.union([LabelElSchema, RoomElSchema]);

export type LabelEl = z.infer<typeof LabelElSchema>;
export type RoomEl = z.infer<typeof RoomElSchema>;
export type MapEl = z.infer<typeof ElSchema>;

export const roomMatchesGoogleEvent = (event: CalendarEvent, room: MapEl) => {
    if (!isRoom(room)) return false;

    if (
        event.location &&
        room.googleName &&
        event.location?.includes(room.googleName)
    )
        return true;

    // we don't check for attendee response status here because it will often be "declined" even if the room is booked for CODE's purposes
    if (
        room.googleName &&
        event.attendees?.some((i) => i.displayName?.includes(room.googleName!))
    )
        return true;

    return false;
};
