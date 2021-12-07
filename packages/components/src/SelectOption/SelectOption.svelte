<script type="ts">
    import { getContext, onMount } from 'svelte';
    import { spreadClassnames } from '../utils';
    import ItemContent from '../ItemContent/ItemContent.svelte';
    import { TERROIR_SELECT_CONTEXT } from '../Select/constants';
    import { TooltipPosition } from '../Tooltip/constants';
    import type { TooltipPositionType } from '../Tooltip/constants';

    export let value: string;

    /**
     * Sets the disabled property of the MenuItem
     */
    export let disabled = false;

    /**
     * Specify the leading icon show before the MenuItem value
     */
    export let icon = '';

    /**
     * Specify the position of tooltips triggered by the helper icon or overflow text
     * @type {'bottom' | 'bottom-start' | 'bottom-end' | 'top' | 'top-start' | 'top-end'}
     */
    export let tooltipPositioning: TooltipPositionType = TooltipPosition.BOTTOM;

    const { callback, collection } = getContext(TERROIR_SELECT_CONTEXT) || {};
    let contentEl: HTMLElement;

    onMount(() => {
        if (collection) {
            const option = document.createElement('option');
            option.appendChild(contentEl.cloneNode(true));
            option.value = value;
            option.disabled = disabled;
            collection.update((c: []) => [...c, option]);
        }
    });

    $: props = {
        ...$$restProps,
        class: spreadClassnames([
            'fvs-select-option',
            'fvs-body-primary',
            disabled && 'disabled',
            $$restProps.class,
        ]),
    };
</script>

<style>
    .fvs-select-option {
        --menu-item-width: 500px;
        position: inherit;

        display: flex;
        align-items: baseline;
        justify-content: space-between;
        width: 100%;
        min-width: 130px;
        max-width: var(--menu-item-width);
        padding: var(--t-spacing-05);

        color: var(--t-color-text-primary);

        background-color: var(--t-color-background-menu-item-rest);

        cursor: pointer;
    }

    .fvs-select-option:hover:not(.disabled) {
        background-color: var(--t-color-background-menu-item-hover);
    }

    .disabled {
        color: var(--t-color-text-disabled);

        cursor: default;
    }
</style>

<li
    on:click={() => {
        if (!disabled && callback) callback(value);
    }}
    on:click
    {...props}
>
    {#if $$slots.description}
        <ItemContent {icon} {disabled} {tooltipPositioning}>
            <span bind:this={contentEl}>
                <slot />
            </span>
            <slot name="description" slot="description" />
        </ItemContent>
    {:else}
        <ItemContent {icon} {disabled} {tooltipPositioning}>
            <span bind:this={contentEl}>
                <slot />
            </span>
        </ItemContent>
    {/if}
</li>
