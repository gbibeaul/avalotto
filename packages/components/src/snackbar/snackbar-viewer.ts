import { get, Writable } from 'svelte/store';
import { ANIMATION_TIME_MS, SnackbarDuration } from './constants';

type SnackbarViewerSettings = {
    autoDismissTimeoutMs?: number;
    animationTimeMs?: number;
};

interface ISnackbarViewer {
    open: (
        opened: Writable<boolean>,
        settings?: SnackbarViewerSettings
    ) => void;

    close: (
        opened: Writable<boolean>,
        settings?: SnackbarViewerSettings
    ) => void;
}

const defaultSettings: SnackbarViewerSettings = {
    autoDismissTimeoutMs: SnackbarDuration.SHORT,
    animationTimeMs: ANIMATION_TIME_MS,
};

export default function SnackbarViewer(): ISnackbarViewer {
    let openPromise = Promise.resolve();

    let closeResolve: () => void;

    let closePromise: Promise<void> = new Promise((resolve) => {
        closeResolve = resolve;
    });

    let autoDismissTimer: ReturnType<typeof setTimeout>;

    let animationTimer: ReturnType<typeof setTimeout>;

    function close(
        opened: Writable<boolean>,
        settings?: SnackbarViewerSettings
    ): void {
        if (!get(opened)) {
            return;
        }

        const { animationTimeMs } = { ...defaultSettings, ...settings };

        clearTimeout(autoDismissTimer);

        opened.set(false);

        clearTimeout(animationTimer);

        animationTimer = setTimeout(() => {
            closeResolve();
            closePromise = new Promise((resolve) => {
                closeResolve = resolve;
            });
        }, animationTimeMs / 2);
    }

    function open(
        opened: Writable<boolean>,
        settings?: SnackbarViewerSettings
    ): void {
        const { autoDismissTimeoutMs, animationTimeMs } = {
            ...defaultSettings,
            ...settings,
        };

        openPromise = openPromise.then(() => {
            clearTimeout(autoDismissTimer);

            opened.set(true);

            animationTimer = setTimeout(() => {
                if (autoDismissTimeoutMs !== null) {
                    autoDismissTimer = setTimeout(() => {
                        close(opened, settings);
                    }, autoDismissTimeoutMs);
                }
            }, animationTimeMs / 2);

            return closePromise;
        });
    }

    return {
        open,
        close,
    };
}
