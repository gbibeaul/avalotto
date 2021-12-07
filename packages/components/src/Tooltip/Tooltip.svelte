<script>
    import { fade } from 'svelte/transition';
    import { spreadClassnames, clickOutside } from '../utils';
    import {
        TooltipVariant,
        TooltipPosition,
        TooltipTrigger,
    } from './constants';
    import Avatar from '../Avatar/Avatar.svelte';
    import Icon from '../Icon/Icon.svelte';

    /**
     * Specify the tooltip variant which controls its size
     * @type {'simple' | 'descriptive' | 'avatar'}
     */
    export let variant = TooltipVariant.SIMPLE;

    /**
     * Specify the tooltip position
     * @type {'bottom' | 'bottom-start' | 'bottom-end' | 'top' | 'top-start' | 'top-end'}
     */
    export let position = TooltipPosition.BOTTOM;

    /**
     * Specify the user full name - only shown on 'avatar' variant
     */
    export let name = '';

    /**
     * Specify the username - only shown on 'avatar' variant
     */
    export let username = '';

    
    export let isAdmin = false;

    /**
     * Specify icon to be added inside the tooltip content (note: this will force a `simple` tooltip to become `descriptive`)
     */
    export let icon = '';

    /**
     * Specify the tooltip trigger - the types of events that cause a tooltip to show.
     * @type {'hover' | 'click'}
     */
    export let trigger = TooltipTrigger.HOVER;

    export let showContent = false;

    let restProps = {};
    let className = '';

    $: ({ class: className, ...restProps } = $$restProps);

    $: props = {
        ...restProps,
        class: spreadClassnames([
            'fvs-tooltip',
            variant &&
                (!icon || variant === TooltipVariant.AVATAR) &&
                `fvs-tooltip--${variant}`,
            position && `fvs-tooltip--${position}`,
            icon && variant !== TooltipVariant.AVATAR && 'fvs-tooltip--icon',
        ]),
    };

    $: wrapperProps = {
        class: spreadClassnames([
            'tooltip-wrapper',
            position && `tooltip-wrapper--${position}`,
            className,
        ]),
    };

    const showTooltip = (currentTrigger) => {
        if (trigger === currentTrigger && !showContent) {
            showContent = true;
        }
    };

    const hideTooltip = (currentTrigger) => {
        if (trigger === currentTrigger && showContent) {
            showContent = false;
        }
    };
</script>

<style>
    .fvs-tooltip--descriptive {
        width: max-content;
        --tooltip-max-width: 210px;
        --tooltip-padding: var(--t-spacing-10);
    }

    .fvs-tooltip--simple {
        height: 20px;
        overflow: hidden;

        white-space: nowrap;
        text-overflow: ellipsis;
        --tooltip-max-width: 400px;
        --tooltip-padding: 0 var(--t-spacing-05);
    }

    .fvs-tooltip--avatar {
        display: flex;
        width: 300px;
        --tooltip-padding: var(--t-spacing-10);
    }

    .fvs-tooltip--icon {
        width: max-content;
        --tooltip-max-width: 235px;
        --tooltip-padding: var(--t-spacing-10);
    }

    .fvs-tooltip--bottom,
    .fvs-tooltip--bottom-start,
    .fvs-tooltip--bottom-end {
        top: 100%;
    }

    .fvs-tooltip--top,
    .fvs-tooltip--top-start,
    .fvs-tooltip--top-end {
        bottom: 100%;
    }

    .fvs-tooltip {
        position: absolute;
        z-index: 1000;

        max-width: var(--tooltip-max-width);
        padding: var(--tooltip-padding);

        color: var(--t-color-text-tooltip);
        font-size: var(--t-font-body-size-tertiary);

        background-color: var(--t-color-background-tooltip);
        border-radius: 10px;
    }

    .tooltip-wrapper--bottom {
        align-items: center;
    }

    .tooltip-wrapper--bottom-end {
        align-items: flex-end;
    }

    .tooltip-wrapper--top {
        align-items: center;
    }

    .tooltip-wrapper--top-end {
        align-items: flex-end;
    }

    .tooltip-wrapper {
        position: relative;

        display: inline-flex;
        flex-direction: column;
        height: fit-content;

        cursor: default;
    }

    .slot-container {
        margin: var(--t-spacing-10) 0;

        cursor: pointer;
    }

    .avatar-tooltip-metadata {
        width: 220px;
        padding-left: var(--t-spacing-10);
    }

    .avatar-tooltip-username {
        margin: 0 0 var(--t-spacing-10) 0;

        font-size: var(--t-font-body-size-tertiary);
        line-height: var(--t-font-body-line-height-tertiary);
    }

    .avatar-header {
        margin: 0;

        font-size: var(--t-font-heading-100-size);
        line-height: var(--t-font-heading-100-line-height);
    }

    .truncate {
        overflow: hidden;

        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .avatar-tooltip-content {
        display: flex;
        flex-wrap: wrap;
    }

    .content-container {
        display: flex;
    }

    .fvs-tooltip :global(.tooltip-icon) {
        padding-right: var(--t-spacing-10);
    }
</style>

<div
    {...wrapperProps}
    use:clickOutside={() => hideTooltip(TooltipTrigger.CLICK)}
    on:mouseleave={() => hideTooltip(TooltipTrigger.HOVER)}
>
    <div
        on:mouseenter={() => showTooltip(TooltipTrigger.HOVER)}
        on:click={() => showTooltip(TooltipTrigger.CLICK)}
        class="slot-container"
    >
        <slot />
    </div>
    {#if showContent}
        <div
            {...props}
            in:fade={{
                duration: 300,
                delay: trigger === TooltipTrigger.HOVER ? 300 : 0,
            }}
        >
            {#if variant === TooltipVariant.AVATAR}
                <Avatar {name} {isAdmin} />
                <div class="avatar-tooltip-metadata">
                    <h5 class="truncate avatar-header">{name}</h5>
                    <p class="avatar-tooltip-username truncate">{username}</p>
                    <div class="avatar-tooltip-content">
                        <slot name="content" />
                    </div>
                </div>
            {:else}
                <div class="content-container">
                    {#if icon}
                        <Icon
                            size="tertiary"
                            class="tooltip-icon"
                            color="var(--t-color-text-tooltip)"
                        >
                            {icon}
                        </Icon>
                    {/if}
                    <slot name="content" />
                </div>
            {/if}
        </div>
    {/if}
</div>
