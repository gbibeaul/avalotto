export enum TooltipPosition {
    BOTTOM = 'bottom',
    BOTTOM_START = 'bottom-start',
    BOTTOM_END = 'bottom-end',
    TOP = 'top',
    TOP_START = 'top-start',
    TOP_END = 'top-end',
}

export type TooltipPositionType =
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'top'
    | 'top-start'
    | 'top-end';

export enum TooltipVariant {
    SIMPLE = 'simple',
    DESCRIPTIVE = 'descriptive',
    AVATAR = 'avatar',
}

export enum TooltipTrigger {
    HOVER = 'hover',
    CLICK = 'click',
}
