<script lang="ts">
    import Icon from '../Icon/Icon.svelte';
    import { spreadClassnames } from '../utils';

    /**
     * Specify the button variant
     */
    export let variant:
        | 'primary'
        | 'secondary'
        | 'tertiary'
        | 'danger'
        | 'link' = 'primary';

    /**
     * Specify the size of the button
     */
    export let large = false;

    /**
     * Toggles the loading/processing state of the button
     */
    export let skeleton = false;

    /**
     * Passed to the disabled property of the button
     */
    export let disabled = false;

    /**
     * Set the `href` to use an anchor link
     * Used to add an href property to the button. Turns the `button` tag into an `a` tag
     */
    export let href = '';

    /**
     * Name of an icon to display to the left of the Button text
     */
    export let icon = '';

    /**
     * Name of an icon to display to the right of the Button text
     */
    export let isTrailingIcon = false;

    let props: {
        disabled: boolean;
        role: string;
        class: string;
    };

    $: props = {
        disabled,
        role: 'button',
        ...$$restProps,
        class: spreadClassnames([
            'fvs-button',
            large ? 'fvs-body-secondary' : 'fvs-body-primary',
            disabled && 'fvs-button--disabled',
            skeleton && 'fvs-button__skeleton',
            large && 'fvs-button--large',
            variant && `fvs-button--${variant}`,
            icon && !$$slots.default && 'fvs-button--icon-only',
            isTrailingIcon && 'fvs-button--trailing-icon',
            $$restProps.class,
        ]),
    };
</script>

<style>
    /* Private Button properties */
    .fvs-button {
        --button-text-color: var(--t-color-text-button-primary-rest);
        --button-text-color--active: var(--t-color-text-button-primary-active);
        --button-text-color--hover: var(--t-color-text-button-primary-hover);
        --button-text-disabled: var(--t-color-text-button-primary-disabled);
        --button-padding: 7px 15px 8px;
        --button-border-radius: var(--t-radius-button);
        --button-height: 35px;
        --button-bg-color: var(--t-color-background-button-primary-rest);
        --button-bg-color--active: var(
            --t-color-background-button-primary-active
        );
        --button-border: none;
        --button-border-color: none;
        --button-border-color--active: none;
        --button-border-color--hover: none;
        --button-border-color--disabled: none;
        --button-bg--hover: var(--t-color-background-button-primary-hover);

        /* These should come from --t values when available */
        --font-family: var(--t-font-button-primary-font-family);
    }

    /* Variant overrides */
    .fvs-button--secondary {
        --button-bg-color: var(--t-color-background-button-secondary-rest);
        --button-bg-color--active: var(
            --t-color-background-button-secondary-active
        );
        --button-color--hover: var(--t-color-text-button-secondary-hover);
        --button-bg--hover: var(--t-color-background-button-secondary-hover);
        --button-text-color: var(--t-color-text-button-secondary-rest);
        --button-text-color--active: var(
            --t-color-text-button-secondary-active
        );
        --button-text-color--hover: var(--t-color-text-button-secondary-hover);
        --button-text-color--disabled: var(
            --t-color-text-button-secondary-disabled
        );
    }

    .fvs-button--tertiary {
        --button-bg-color: var(--t-color-background-button-tertiary-rest);
        --button-bg-color--active: var(
            --t-color-background-button-tertiary-active
        );
        --button-border: 1px solid var(--t-color-border-button-tertiary-rest);
        --button-border-color--disabled: var(
            --t-color-border-button-tertiary-disabled
        );
        --button-border-color--hover: var(
            --t-color-border-button-tertiary-hover
        );
        --button-border-color--active: var(
            --t-color-border-button-tertiary-active
        );
        --button-bg--hover: var(--t-color-background-button-tertiary-hover);
        --button-text-color: var(--t-color-text-button-tertiary-rest);
        --button-text-color--active: var(--t-color-text-button-tertiary-active);
        --button-text-color--hover: var(--t-color-text-button-tertiary-hover);
        --button-text-color--disabled: var(
            --t-color-text-button-tertiary-disabled
        );
    }

    .fvs-button--large {
        --button-padding: 12px var(--t-spacing-20) 13px;
        --button-height: 50px;
    }

    .fvs-button--danger {
        --button-bg-color: var(--t-color-background-button-danger-rest);
        --button-bg-color--active: var(
            --t-color-background-button-danger-active
        );
        --button-bg--hover: var(--t-color-background-button-danger-hover);
        --button-text-color: var(--t-color-text-button-danger-rest);
        --button-text-color--active: var(--t-color-text-button-danger-active);
        --button-text-color--hover: var(--t-color-text-button-danger-hover);
        --button-text-color--disabled: var(
            --t-color-text-button-danger-disabled
        );
    }

    .fvs-button--link {
        --button-bg-color: transparent;
        --button-bg-color--active: transparent;
        --button-bg--hover: transparent;

        --button-border: none;
        --button-border-color--disabled: none;
        --button-border-color--hover: none;
        --button-border-color--active: none;

        --button-text-color: var(--t-color-text-link-rest);
        --button-text-color--active: var(--t-color-text-link-active);
        --button-text-color--hover: var(--t-color-text-link-hover);
        --button-text-color--disabled: var(--t-color-text-link-disabled);
    }

    /* Base Styles */
    .fvs-button {
        display: inline-flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        max-width: 400px;
        height: var(--button-height);
        margin: 0;
        padding: var(--button-padding);

        color: var(--button-text-color);
        font-weight: var(--t-font-weight-header);
        font-family: var(--font-family);
        white-space: nowrap;

        text-align: center;
        text-decoration: none;
        vertical-align: baseline;

        background-color: var(--button-bg-color);
        border: var(--button-border);
        border-color: var(--button-border-color);
        border-radius: var(--button-border-radius);
        outline: none;
        cursor: pointer;

        transition: all 0.2s ease-in-out;

        user-select: none;
    }

    .fvs-button--trailing-icon {
        flex-direction: row-reverse;
    }

    .fvs-button :global(.mdis) {
        margin-right: 5px;
    }

    .fvs-button--trailing-icon :global(.mdis) {
        margin-right: 0;
        margin-left: 5px;
    }

    .fvs-button:hover:not(:active):not(:disabled):not(.fvs-button--disabled) {
        color: var(--button-text-color--hover);

        background: var(--button-bg--hover);
        border-color: var(--button-border-color--hover);
    }

    .fvs-button:active:not(:disabled) {
        color: var(--button-text-color--active);

        background: var(--button-bg-color--active);
        border-color: var(--button-border-color--active);
    }

    .fvs-button:disabled,
    .fvs-button--disabled {
        --button-bg-color: var(--t-color-background-button-primary-disabled);
        --button-text-color: var(--t-color-text-button-primary-disabled);
        border-color: var(--button-border-color--disabled);
        cursor: default;
        opacity: 0.65;
    }

    .fvs-button:disabled.fvs-button--secondary,
    .fvs-button--disabled.fvs-button--danger {
        --button-bg-color: var(--t-color-background-button-secondary-disabled);
        --button-text-color: var(--t-color-text-button-secondary-disabled);
    }

    .fvs-button:disabled.fvs-button--tertiary,
    .fvs-button--disabled.fvs-button--danger {
        --button-bg-color: var(--t-color-background-button-tertiary-disabled);
        --button-text-color: var(--t-color-text-button-tertiary-disabled);
    }

    .fvs-button:disabled.fvs-button--danger,
    .fvs-button--disabled.fvs-button--danger {
        --button-bg-color: var(--t-color-background-button-danger-disabled);
        --button-text-color: var(--t-color-text-button-danger-disabled);
    }

    .fvs-button__skeleton {
        position: relative;

        width: 150px;

        min-height: 35px;
        padding: 0;

        background: #dde1e6;

        pointer-events: none;
    }

    .fvs-button__skeleton:before {
        position: absolute;
        top: 0;
        left: 0;

        width: 0%;

        height: var(--button-height);

        background: #d0d7dd;
        border-radius: var(--t-radius-button);

        animation: var(--t-animation-skeleton) skeleton;

        content: '';
    }

    .fvs-button--icon-only {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 35px;
        margin: 0;

        color: var(--button-text-color);
    }

    .fvs-button--icon-only :global(.mdis) {
        margin: 0;
    }

    .fvs-button--icon-only.fvs-button--large {
        width: 50px;
    }

    .fvs-button__skeleton.fvs-button--large {
        height: 50px;
    }

    .text-container {
        overflow: hidden;

        text-overflow: ellipsis;
    }
</style>

{#if skeleton}
    <div
        {...props}
        on:click
        on:mouseover
        on:mouseenter
        on:mouseleave
        on:focus
        data-testid="fvButtonSkeleton"
    />
{:else if href && !disabled}
    <a
        rel={$$restProps.target === '_blank'
            ? 'noopener noreferrer'
            : undefined}
        {href}
        {...props}
        on:click
        on:mouseover
        on:mouseenter
        on:mouseleave
        on:focus
    >
        <slot />
    </a>
{:else}
    <button
        {...props}
        on:click
        on:mouseover
        on:mouseenter
        on:mouseleave
        on:focus
    >
        {#if icon}
            <Icon
                size={large ? 'secondary' : 'primary'}
                color="--button-text-color">{icon}</Icon
            >
        {/if}
        <div class="text-container">
            <slot />
        </div>
    </button>
{/if}
