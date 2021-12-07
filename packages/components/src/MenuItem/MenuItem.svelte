<script lang="ts">
    import { getContext } from 'svelte';
    import Icon from '../Icon/Icon.svelte';
    import { MENU_CONTEXT } from '../Menu/constants';
    import ItemContent from '../ItemContent/ItemContent.svelte';
    import { TooltipPosition } from '../Tooltip/constants';
    import type { TooltipPositionType } from '../Tooltip/constants';
    import Tooltip from '../Tooltip/Tooltip.svelte';
    import { spreadClassnames } from '../utils';

    /**
     * Sets the disabled property of the MenuItem
     */
    export let disabled = false;

    /**
     * Specify the leading icon show before the MenuItem value
     */
    export let icon = '';

    /**
     * Specify the positioning of the tooltip in relation to the helper icon
     */
    export let helperTooltipPositioning: TooltipPositionType =
        TooltipPosition.BOTTOM_END;

    /**
     * Specify the positioning of the text overflow tooltip
     */
    export let overflowTooltipPositioning: TooltipPositionType =
        TooltipPosition.BOTTOM;

    const { callback } = getContext(MENU_CONTEXT) || {};

    let restProps = {};
    let className = '';

    $: ({ class: className, ...restProps } = $$restProps);

    $: props = {
        class: spreadClassnames([
            'fvs-menu-item',
            'fvs-body-primary',
            $$slots.avatar && 'fvs-menu-item--avatar',
            disabled && 'disabled',
            className,
        ]),
    };
</script>

<style>
    .fvs-menu-item {
        --menu-item-width: 500px;
        position: relative;

        display: flex;
        width: 100%;
        min-width: 100px;
        max-width: var(--menu-item-width);

        text-align: left;
    }

    .fvs-menu-item-button {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        width: 100%;
        padding: var(--t-spacing-05);

        color: var(--t-color-text-primary);

        text-align: left;

        background-color: var(--t-color-background-menu-item-rest);
        border: none;
        cursor: pointer;
    }

    .fvs-menu-item--avatar .fvs-menu-item-button {
        align-items: center;
    }

    .fvs-menu-item:hover:not(.disabled) .fvs-menu-item-button {
        background-color: var(--t-color-background-menu-item-hover);
    }

    .fvs-body-tertiary {
        color: var(--t-color-text-tertiary);
    }
    .disabled {
        color: var(--t-color-text-disabled);

        cursor: default;
    }

    .menu-item-label-container {
        max-width: 80%;
        padding: 0 2.5px 0 var(--t-spacing-05);

        white-space: nowrap;
    }

    .menu-item-helper-container {
        display: flex;
        align-items: center;
        height: 20px;

        font-size: 18px;
    }

    .menu-item-helper-container :global(.slot-container) {
        z-index: 1;
    }

    .menu-item-helper-container :global(.tooltip-wrapper) {
        position: inherit;

        float: right;
    }

    .menu-item-avatar-container {
        padding-right: var(--t-spacing-05);
    }
</style>

<li {...props}>
    <button
        class="fvs-menu-item-button"
        {...restProps}
        on:click
        on:click={() => {
            if (!disabled && callback) callback();
        }}
        class:disabled
        {disabled}
    >
        {#if $$slots.avatar}
            <div class="menu-item-avatar-container">
                <slot name="avatar" />
            </div>
        {/if}
        {#if $$slots.description}
            <ItemContent
                {icon}
                {disabled}
                tooltipPositioning={overflowTooltipPositioning}
            >
                <slot />
                <slot name="description" slot="description" />
            </ItemContent>
        {:else}
            <ItemContent
                {icon}
                {disabled}
                tooltipPositioning={overflowTooltipPositioning}
            >
                <slot />
            </ItemContent>
        {/if}

        {#if $$slots.label}
            <div
                class="fvs-body-tertiary menu-item-label-container"
                class:disabled
            >
                <slot name="label" />
            </div>
        {:else if $$slots.helper}
            <div class="fvs-body-tertiary menu-item-helper-container">
                <Tooltip
                    variant="descriptive"
                    position={helperTooltipPositioning}
                >
                    <Icon
                        color={disabled
                            ? '--t-color-text-disabled'
                            : '--t-color-text-menu-item-helper'}
                    >
                        help_outline
                    </Icon>
                    <slot slot="content" name="helper" />
                </Tooltip>
            </div>
        {/if}
    </button>
</li>
