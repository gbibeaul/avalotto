export type ChipVariantType = 'primary' | 'secondary' | 'tertiary';
export enum ChipVariant {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    TERTIARY = 'tertiary',
}

export type ChipTsTypes =
    | 'default'
    | 'hashtag'
    | 'received'
    | 'failed'
    | 'delivered'
    | 'pending'
    | 'projectAdmin';

export enum ChipType {
    DEFAULT = 'default',
    HASHTAG = 'hashtag',
    RECEIVED = 'received',
    FAILED = 'failed',
    DELIVERED = 'delivered',
    PENDING = 'pending',
    PROJECT_ADMIN = 'projectAdmin',
}

export const chipColorLookup = {
    [ChipType.DEFAULT]: '11',
    [ChipType.HASHTAG]: '9',
    [ChipType.RECEIVED]: '5',
    [ChipType.FAILED]: '3',
    [ChipType.DELIVERED]: '7',
    [ChipType.PENDING]: '11',
    [ChipType.PROJECT_ADMIN]: '5',
};

export const defaultTextLookup = {
    [ChipType.DEFAULT]: '',
    [ChipType.HASHTAG]: '#hashtag',
    [ChipType.RECEIVED]: 'Received',
    [ChipType.FAILED]: 'Failed',
    [ChipType.DELIVERED]: 'Delivered',
    [ChipType.PENDING]: 'Pending',
    [ChipType.PROJECT_ADMIN]: 'Project Admin',
};
