import { writable } from 'svelte/store';

export default function createThemeStore(name = ''): {
    subscribe: (subscription: (value: unknown) => void) => () => void;
    set: (theme: string) => void;
} {
    const { subscribe, set } = writable(name);

    return {
        subscribe,
        set: (theme) => set(theme),
    };
}
