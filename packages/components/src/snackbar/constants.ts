export enum SnackbarPosition {
    BOTTOM = 'bottom',
    BOTTOM_START = 'bottom-start',
    BOTTOM_END = 'bottom-end',
}

export enum SnackbarDuration {
    SHORT = 4000,
    MEDIUM = 7000,
    LONG = 10000,
}

export const ANIMATION_TIME_MS = 800;

export interface SnackbarApi {
    open: () => void;

    close: () => void;
}
