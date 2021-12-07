<script lang="ts">
    import { setContext } from 'svelte';
    import { spreadClassnames, clickOutside } from '../utils';
    import Button from '../Button/Button.svelte';
    import MenuSurface from '../MenuSurface/MenuSurface.svelte';
    import { MENU_CONTEXT, Alignment } from './constants';
    import type { AlignmentType } from './constants';

    /**
     * When using the default trigger button and icon - specify any text that should appear to the left of icon
     */
    export let triggerValue = '';

    /**
     * Specify the position of the menu dropdown underneath the trigger button
     */
    export let position: AlignmentType = Alignment.RIGHT;

    /**
     * Specify the text alignment of the menu items
     */
    export let textAlignment: AlignmentType = Alignment.LEFT;

    /**
     * Specify whether the menu should allow multiple selections (then does not auto-dismiss on item click)
     */
    export let multiple = false;

    let menuOpen = false;

    $: cssVarStyles = `--fvs-menu-text-align:${textAlignment};`;

    $: props = {
        ...$$restProps,
        class: spreadClassnames(['fvs-menu', $$restProps.class]),
        style: cssVarStyles,
    };

    const dismissMenu = () => {
        if (menuOpen) {
            menuOpen = false;
        }
    };

    const toggleMenu = () => {
        menuOpen = !menuOpen;
    };

    setContext(MENU_CONTEXT, {
        callback: () => {
            if (!multiple) {
                dismissMenu();
            }
        },
    });
</script>

<style>
    .fvs-menu {
        position: relative;

        display: inline-flex;
        flex-direction: column;
        align-items: flex-end;
        height: fit-content;
    }

    .trigger-container {
        display: inline-flex;
    }

    .fvs-menu :global(.fvs-menu-item-button) {
        text-align: var(--fvs-menu-text-align);
    }

    ul {
        margin: 0;
        padding: 0;

        list-style: none;
    }
</style>

<div {...props} use:clickOutside={dismissMenu}>
    <div class="trigger-container" on:click={toggleMenu}>
        <slot name="trigger">
            {#if triggerValue}
                <Button icon="arrow_drop_down" aria-expanded={menuOpen}>
                    {triggerValue}
                </Button>
            {:else}
                <Button icon="arrow_drop_down" />
            {/if}
        </slot>
    </div>
    {#if menuOpen}
        <MenuSurface {position}>
            <ul>
                <slot />
            </ul>
        </MenuSurface>
    {/if}
</div>
