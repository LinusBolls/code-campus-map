import { defineConfig } from 'vitest/config';

const isCIPipeline = process.env.TEST_ENV === 'CI';

export default defineConfig({
    test: {
        environment: 'jsdom',

        include: ['**/*.test.(ts|tsx)'],
    },
});
