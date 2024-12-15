import { DAY, SECOND } from './utils/time';

export const Config = {
    SLIDES_REFETCH_INTERVAL: 60 * SECOND,
    ROOM_SCHEDULES_REFETCH_INTERVAL: 60 * SECOND,
    CALENDAR_EVENTS_REFETCH_INTERVAL: 60 * SECOND,
    SLIDE_DURATION: 10 * SECOND,
    FILE_CACHE_DURATION_MS: 365 * DAY,

    POSTS_REQUIRE_APPROVAL: false,
};
