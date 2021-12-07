<script type="ts">
    import { scale } from 'svelte/transition';
    import { spreadClassnames } from '../utils';

    /**
     * Specify the position of the menu surface underneath containing element
     */
    export let position: 'left' | 'right' = 'right';

    export let animation = scale;

    const MINIMUM_DISTANCE_FROM_VIEWPORT = 20;

    let menuSurface: HTMLElement;
    let windowWidth: number;
    let offsetHorizontal = 0;

    // Handle keeping menu within edge of viewport so doesn't go off screen
    $: menuSurfaceRight =
        menuSurface && windowWidth && menuSurface.getBoundingClientRect().right;
    $: menuSurfaceLeft =
        menuSurface && windowWidth && menuSurface.getBoundingClientRect().left;

    $: if (menuSurface) {
        if (menuSurfaceRight > windowWidth - MINIMUM_DISTANCE_FROM_VIEWPORT) {
            offsetHorizontal =
                windowWidth -
                (menuSurfaceRight + MINIMUM_DISTANCE_FROM_VIEWPORT);
        } else if (menuSurfaceLeft < MINIMUM_DISTANCE_FROM_VIEWPORT) {
            offsetHorizontal =
                Math.abs(menuSurfaceLeft) + MINIMUM_DISTANCE_FROM_VIEWPORT;
        } else {
            offsetHorizontal = 0;
        }
    }

    $: if (!menuSurface) {
        offsetHorizontal = 0;
    }

    $: menuWidth = menuSurface?.clientWidth;

    $: cssVarStyles = `
        --menu-offset: ${offsetHorizontal}px;
        --menu-width: ${menuWidth - 50}px;
    `;

    $: props = {
        ...$$restProps,
        class: spreadClassnames([
            'fvs-menu-surface',
            position && `fvs-menu-surface--${position}`,
            $$restProps.class,
        ]),
        style: cssVarStyles,
    };
</script>

<style>
    .fvs-menu-surface--right {
        transform: translate(var(--menu-offset));
    }

    .fvs-menu-surface--right .scrollable-content {
        transform-origin: right top;
    }

    .fvs-menu-surface--left {
        left: var(--menu-offset);
    }

    .fvs-menu-surface--left .scrollable-content {
        transform-origin: left top;
    }

    .scrollable-content {
        max-height: 192px;
        padding: var(--t-spacing-05) 0;
        overflow-x: hidden;
        overflow-y: auto;

        background-color: var(--t-color-background-menu);
        box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.14),
            0px 2px 4px -1px rgba(0, 0, 0, 0.12),
            0px 1px 10px rgba(0, 0, 0, 0.2);
    }
    .fvs-menu-surface {
        position: absolute;
        top: 100%;
        z-index: 999;

        width: fit-content;
        min-width: 100px;
        max-width: 500px;
    }

    .fvs-menu-surface .scrollable-content:after {
        position: absolute;
        bottom: 0;

        width: 100%;
        height: 10px;

        background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0) 0%,
            var(--t-color-background-menu) 100%
        );

        content: '';
    }

    .trigger-container {
        display: inline-flex;
    }

    .top-gradient {
        position: absolute;
        top: 0;

        width: 100%;
        height: 10px;

        background: linear-gradient(
            0deg,
            rgba(255, 255, 255, 0) 0%,
            var(--t-color-background-menu) 100%
        );
    }

    .fvs-menu-surface .scrollable-content :global(.fvs-menu-item) {
        width: 100%;
    }

    .fvs-menu-surface :global(.fvs-tooltip) {
        max-width: var(--menu-width);
    }
</style>

<svelte:window bind:innerWidth={windowWidth} />

<div {...props} bind:this={menuSurface}>
    <div class="scrollable-content" in:animation={{ duration: 300 }}>
        <slot />
        <div class="top-gradient" />
    </div>
</div>
