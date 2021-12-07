<script type="ts">
    import { getContext } from 'svelte';
    import { spreadClassnames } from '../../utils';
    import { TERROIR_TAB_CONTEXT } from '../constants';
    import Icon from '../../Icon/Icon.svelte';

    /**
     * Sets the disabled property of the MenuItem
     */
    export let disabled = false;

    /**
     * Specify the leading icon show before the MenuItem value
     */
    export let icon = '';

    let tabEl: HTMLElement = null;

    const tabId = Math.random().toString(36);

    const {
        registerTab,
        selectedIndex,
        selectTab,
        longestTab,
        tabs,
        fullWidth,
    } = getContext(TERROIR_TAB_CONTEXT) || {};

    $: if (registerTab && tabEl && longestTab) {
        const { width } = tabEl.getBoundingClientRect();
        registerTab(tabId);
        longestTab.update((currLength: number) =>
            width > currLength ? width : currLength
        );
    }

    $: isSelected = tabs && selectedIndex && $tabs[$selectedIndex] === tabId;

    $: cssVarStyles = `--tab-width:${$longestTab}px;`;

    $: props = {
        ...$$restProps,
        class: spreadClassnames([
            'fvs-tab',
            'fvs-body-primary',
            isSelected && 'fvs-tab--active',
            fullWidth && 'fvs-tab--full-width',
            disabled && 'disabled',
            $$restProps.class,
        ]),
        style: cssVarStyles,
    };
</script>

<style>
    .fvs-tab--active {
        position: relative;
    }

    .fvs-tab {
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        max-width: 300px;
        height: 35px;
        padding: 0 20px;

        color: var(--t-color-text-tab-unselected);

        background-color: var(--t-color-background-tab-unselected, transparent);
        border: none;

        border-color: var(--t-color-border-tab-unselected);
        border-style: solid;
        border-width: var(--t-border-width-tab, 0);
        border-top-left-radius: var(--t-radius-select);
        border-top-right-radius: var(--t-radius-select);
        cursor: pointer;
    }

    .fvs-tab:not(.fvs-tab--full-width) {
        width: var(--tab-width);
    }

    .fvs-tab--full-width {
        flex: 1;
    }

    .fvs-tab--active {
        color: var(--t-color-text-tab-selected);

        background-color: var(--t-color-background-tab-selected);
    }

    .fvs-tab:hover:not(.fvs-tab--active):not(.disabled) {
        color: var(--t-color-text-tab-hover);

        background-color: var(--t-color-background-tab-hover);
    }

    .fvs-tab :global(.fvs-tab-icon) {
        padding-right: 5px;

        color: var(--t-color-text-tab-unselected);
    }
    .fvs-tab--active :global(.fvs-tab-icon) {
        color: var(--t-color-text-tab-selected);
    }

    .fvs-tab.disabled :global(.fvs-tab-icon) {
        color: var(--t-color-text-tab-disabled);
    }

    .fvs-tab:hover:not(.fvs-tab--active):not(.disabled) :global(.fvs-tab-icon) {
        color: var(--t-color-text-tab-hover);
    }

    .disabled {
        color: var(--t-color-text-tab-disabled);

        border-color: var(--t-color-border-tab-disabled);
        cursor: default;
    }
</style>

<button
    role="tab"
    aria-disabled={disabled}
    class:disabled
    bind:this={tabEl}
    aria-selected={isSelected}
    on:click={selectTab && !disabled && (() => selectTab(tabId))}
    on:click
    {...props}
>
    {#if icon}
        <Icon class="fvs-tab-icon">{icon}</Icon>
    {/if}
    <slot />
</button>
