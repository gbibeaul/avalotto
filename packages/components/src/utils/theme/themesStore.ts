import { writable } from 'svelte/store';

type tTheme = { [key: string]: string };
type tThemeName = string;
type tThemes = tTheme[];

export default function createThemesStore(init: tThemes = []): {
    subscribe: (subscription: (value: unknown) => void) => () => void;
    get: (themeName: tThemeName) => void;
    add: (theme: tTheme) => void;
    remove: (themeName: tThemeName) => void;
    update: (theme: tTheme) => void;
    removeAll: () => void;
} {
    const { subscribe, set, update: updateStore } = writable(init);

    let internalValue: tThemes = init;

    const get = (themeName: tThemeName) =>
        internalValue.find((t) => t.name === themeName);

    const add = (theme: tTheme) => {
        updateStore((s) => {
            s.push(theme);
            internalValue = s;
            return s;
        });
    };

    const remove = (themeName: tThemeName) => {
        updateStore((s) => {
            for (let i = 0; i < s.length; i += 1) {
                if (s[i].name === themeName) s.splice(i, 1);
            }
            internalValue = s;
            return s;
        });
    };

    const update = (theme: tTheme) => {
        remove(theme.name);
        add(theme);
    };

    const removeAll = () => {
        const clear: tThemes = [];
        internalValue = clear;
        set(clear);
    };

    return {
        subscribe,
        get,
        add,
        remove,
        update,
        removeAll,
    };
}
