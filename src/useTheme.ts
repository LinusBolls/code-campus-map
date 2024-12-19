import { create } from 'zustand';

import { parseCookies } from './utils/parseCookies';

export function getTheme() {
    return (parseCookies().theme ?? 'light') as 'light' | 'dark';
}

export function toggleTheme() {
    const prevTheme = getTheme();

    const theme = prevTheme === 'light' ? 'dark' : 'light';

    document.documentElement.classList.remove(prevTheme);
    document.documentElement.classList.add(theme);

    document.cookie = `theme=${theme}; path=/`;
}

interface ThemeState {
    theme: 'light' | 'dark';
    actions: {
        setTheme: (newTheme: string) => void;
    };
}

const useThemeStore = create<ThemeState>((set) => ({
    theme: getTheme(),
    actions: {
        setTheme: (newTheme) => {
            document.documentElement.classList.remove(
                newTheme === 'light' ? 'dark' : 'light'
            );
            document.documentElement.classList.add(newTheme);

            document.cookie = `theme=${newTheme}; path=/`;

            set({ theme: newTheme as 'light' | 'dark' });
        },
    },
}));

export function useTheme() {
    const value = useThemeStore();

    function toggleTheme() {
        value.actions.setTheme(value.theme === 'light' ? 'dark' : 'light');
    }

    return {
        theme: value.theme,
        setTheme: value.actions.setTheme,
        toggleTheme,
    };
}
