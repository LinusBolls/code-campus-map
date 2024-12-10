import { z } from 'zod';

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
});
export const ElSchema = z.union([LabelElSchema, RoomElSchema]);

export type LabelEl = z.infer<typeof LabelElSchema>;
export type RoomEl = z.infer<typeof RoomElSchema>;
export type MapEl = z.infer<typeof ElSchema>;

/**
 * @param {string} googleLocation looks like `CODE-1-Cosmos | B.13 (1), CODE-1-Cosmos | A.13 (1)`
 */
export const roomMatchesGoogleLocation = (
    googleLocation: string,
    room: MapEl
) => {
    if (!isRoom(room)) return false;

    return room.googleName === googleLocation;

    // const rooms = googleLocation.split(", ");

    // const roomInfos = rooms.map((i) => {
    //   const [first, second] = i.split(" | ");

    //   const name = first.replace("CODE-1-", "");

    //   const nr = second.split(" ")[0];

    //   return { name, nr };
    // });
    // return (
    //   roomInfos.some((i) => room.rooms?.includes(i.nr)) ||
    //   roomInfos.some((i) => i.name === room.name)
    // );
};
