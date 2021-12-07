<script lang="ts">
    import Icon from '../Icon/Icon.svelte';
    import { spreadClassnames } from '../utils';
    import {
        ChipVariant,
        ChipType,
        chipColorLookup,
        defaultTextLookup,
    } from './constants';
    import type { ChipVariantType, ChipTsTypes } from './constants';

    /**
     * Specify the chip variant. Primary chip should be used with primary body text, secondary with secondary text, etc.
     */
    export let variant: ChipVariantType = ChipVariant.PRIMARY;

    /**
     * Specify the chip type
     */
    export let type: ChipTsTypes = ChipType.DEFAULT;

    /**
     * Toggles disabled state of chip
     */
    export let disabled = false;

    /**
     * Used to add an icon to left side of the chip
     */
    export let icon = '';

    /**
     * Pass a funciton to call when action icon is clicked, if nothing is passed, chip will not display action icon
     */
    export let action: null | (() => void) = null;

    /**
     * Specify the content within the chip
     */
    export let content = '';

    /**
     * Specify the background-color property of the chip (ONLY applies to 'hashtag' type). Applies associated object colors to its icons and states, as well.
     */
    export let color: string | number | null = null;

    const getColor = (): string | number => {
        if (type === ChipType.HASHTAG && color) {
            return color;
        }

        return chipColorLookup[type];
    };

    let hovering = false;

    $: defaultText = defaultTextLookup[type];

    $: iconVariant =
        variant === ChipVariant.SECONDARY
            ? ChipVariant.PRIMARY
            : ChipVariant.TERTIARY;

    $: props = {
        ...$$restProps,
        class: spreadClassnames([
            'fvs-chip',
            disabled && 'fvs-chip--disabled',
            variant && `fvs-chip--${variant}`,
            icon && 'fvs-chip--icon',
            action && 'fvs-chip--action',
            `fvs-chip--color-${getColor()}`,
            $$restProps.class,
        ]),
    };
</script>

<style>
    .fvs-chip {
        --chip-text-color: var(--t-color-text-chip-primary);
        --chip-border-radius: 20px;
        --chip-font-size: var(--t-font-body-size-tertiary);
        --chip-line-height: var(--t-font-body-line-height-primary);
        --chip-height: 20px;
        --chip-padding: 0 var(--t-spacing-05);
    }

    .fvs-chip--secondary {
        --chip-border-radius: 13px;
        --chip-font-size: var(--t-font-body-size-primary);
        --chip-line-height: var(--t-font-body-line-height-secondary);
        --chip-height: 25px;
        --chip-padding: 0 var(--t-spacing-10);
    }

    .fvs-chip--tertiary {
        --chip-border-radius: 9px;
        --chip-font-size: var(--t-font-body-size-tertiary);
        --chip-line-height: var(--t-font-body-line-height-tertiary);
        --chip-height: 15px;
    }

    .fvs-chip--icon.fvs-chip--primary {
        --chip-border-radius: 10px;
    }

    .fvs-chip--color-1 {
        --chip-background-color: var(--t-color-object-1-primary);
    }

    .fvs-chip--color-1:hover:not(.fvs-chip--disabled) {
        --chip-background-color: var(--t-color-object-1-secondary);
    }

    .fvs-chip--color-1.fvs-chip--disabled {
        --chip-background-color: var(--t-color-object-1-tertiary);
    }

    .fvs-chip--color-2 {
        --chip-background-color: var(--t-color-object-2-primary);
    }

    .fvs-chip--color-2:hover:not(.fvs-chip--disabled) {
        --chip-background-color: var(--t-color-object-2-secondary);
    }

    .fvs-chip--color-2.fvs-chip--disabled {
        --chip-background-color: var(--t-color-object-2-tertiary);
    }

    .fvs-chip--color-3 {
        --chip-background-color: var(--t-color-object-3-primary);
    }

    .fvs-chip--color-3:hover:not(.fvs-chip--disabled) {
        --chip-background-color: var(--t-color-object-3-secondary);
    }

    .fvs-chip--color-3.fvs-chip--disabled {
        --chip-background-color: var(--t-color-object-3-tertiary);
    }

    .fvs-chip--color-4 {
        --chip-background-color: var(--t-color-object-4-primary);
    }

    .fvs-chip--color-4:hover:not(.fvs-chip--disabled) {
        --chip-background-color: var(--t-color-object-4-secondary);
    }

    .fvs-chip--color-4.fvs-chip--disabled {
        --chip-background-color: var(--t-color-object-4-tertiary);
    }

    .fvs-chip--color-5 {
        --chip-background-color: var(--t-color-object-5-primary);
    }

    .fvs-chip--color-5:hover:not(.fvs-chip--disabled) {
        --chip-background-color: var(--t-color-object-5-secondary);
    }

    .fvs-chip--color-5.fvs-chip--disabled {
        --chip-background-color: var(--t-color-object-5-tertiary);
    }

    .fvs-chip--color-6 {
        --chip-background-color: var(--t-color-object-6-primary);
    }

    .fvs-chip--color-6:hover:not(.fvs-chip--disabled) {
        --chip-background-color: var(--t-color-object-6-secondary);
    }

    .fvs-chip--color-6.fvs-chip--disabled {
        --chip-background-color: var(--t-color-object-6-tertiary);
    }

    .fvs-chip--color-7 {
        --chip-background-color: var(--t-color-object-7-primary);
    }

    .fvs-chip--color-7:hover:not(.fvs-chip--disabled) {
        --chip-background-color: var(--t-color-object-7-secondary);
    }

    .fvs-chip--color-7.fvs-chip--disabled {
        --chip-background-color: var(--t-color-object-7-tertiary);
    }

    .fvs-chip--color-8 {
        --chip-background-color: var(--t-color-object-8-primary);
    }

    .fvs-chip--color-8:hover:not(.fvs-chip--disabled) {
        --chip-background-color: var(--t-color-object-8-secondary);
    }

    .fvs-chip--color-8.fvs-chip--disabled {
        --chip-background-color: var(--t-color-object-8-tertiary);
    }

    .fvs-chip--color-9 {
        --chip-background-color: var(--t-color-object-9-primary);
    }

    .fvs-chip--color-9:hover:not(.fvs-chip--disabled) {
        --chip-background-color: var(--t-color-object-9-secondary);
    }

    .fvs-chip--color-9.fvs-chip--disabled {
        --chip-background-color: var(--t-color-object-9-tertiary);
    }

    .fvs-chip--color-10 {
        --chip-background-color: var(--t-color-object-10-primary);
    }

    .fvs-chip--color-10:hover:not(.fvs-chip--disabled) {
        --chip-background-color: var(--t-color-object-10-secondary);
    }

    .fvs-chip--color-10.fvs-chip--disabled {
        --chip-background-color: var(--t-color-object-10-tertiary);
    }

    .fvs-chip--color-11 {
        --chip-background-color: var(--t-color-object-11-primary);
    }

    .fvs-chip--color-11:hover:not(.fvs-chip--disabled) {
        --chip-background-color: var(--t-color-object-11-secondary);
    }

    .fvs-chip--color-11.fvs-chip--disabled {
        --chip-background-color: var(--t-color-object-11-tertiary);
    }

    .fvs-chip--color-12 {
        --chip-background-color: var(--t-color-object-12-primary);
    }

    .fvs-chip--color-12:hover:not(.fvs-chip--disabled) {
        --chip-background-color: var(--t-color-object-12-secondary);
    }

    .fvs-chip--color-12.fvs-chip--disabled {
        --chip-background-color: var(--t-color-object-12-tertiary);
    }

    .fvs-chip {
        display: inline-flex;

        align-items: center;
        height: var(--chip-height);
        padding: var(--chip-padding);

        color: var(--chip-text-color);
        font-size: var(--chip-font-size);
        line-height: var(--chip-line-height);
        vertical-align: bottom;

        background: var(--chip-background-color);
        border-radius: var(--chip-border-radius);
        cursor: pointer;
    }

    .fvs-chip--disabled {
        cursor: default;
    }

    .icon-container-left {
        height: 100%;
        margin-right: 2px;
    }

    .icon-container-right {
        display: inline-flex;
        align-items: center;
        height: 100%;
        margin-left: 2px;
    }

    button {
        height: 100%;
        padding: 0;

        color: var(--chip-text-color);

        background: none;

        border: none;
        cursor: pointer;
    }
</style>

<div
    {...props}
    on:click
    on:mouseenter={() => {
        hovering = true;
    }}
    on:mouseleave={() => {
        hovering = false;
    }}
>
    {#if icon}
        <div class="icon-container-left">
            <Icon color="--base-color-white" size={iconVariant}>{icon}</Icon>
        </div>
    {/if}
    {content || defaultText}
    {#if action}
        <button on:click|stopPropagation={action} {disabled}>
            <div class="icon-container-right">
                <Icon
                    color={hovering || disabled
                        ? '--base-color-white'
                        : `--t-color-object-${getColor()}-secondary`}
                    size={iconVariant}
                >
                    cancel
                </Icon>
            </div>
        </button>
    {/if}
</div>
