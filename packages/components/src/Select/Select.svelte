<script lang="ts">
    import { slide } from 'svelte/transition';
    import { onMount, setContext, tick } from 'svelte';
    import { writable } from 'svelte/store';
    import { spreadClassnames, clickOutside, useActions } from '../utils';
    import MenuSurface from '../MenuSurface/MenuSurface.svelte';
    import Icon from '../Icon/Icon.svelte';
    import { Alignment, TERROIR_SELECT_CONTEXT } from './constants';
    import type { AlignmentType } from './constants';
    import type { UseActions } from '../utils';

    /**
     * Specify the position of the menu dropdown underneath the trigger button
     */
    export let position: AlignmentType = Alignment.RIGHT;

    /**
     * Specify the text alignment of the items
     */
    export let textAlignment: AlignmentType = Alignment.LEFT;

    /**
     * Override the dynamic width of the select with a fixed width
     */
    export let selectWidth = 0;

    /**
     * Stores the value of the select. Can be passed in a default to display
     */
    export let value = '';

    /**
     * Specify the placeholder text before value is selected
     */
    export let placeholder = '';

    /**
     * Specify whether the current value is invalid
     */
    export let invalid = false;

    /**
     * Specify whether the select is disabled
     */
    export let disabled = false;

    /**
     * Specify icon to display
     */
    export let icon = '';

    /**
     * Specify whether the select is required to have a value
     */
    export let required = false;

    /**
     * Specify the name attribute
     */
    export let name = '';

    /**
     * Specify the form the select belongs to
     */
    export let form = '';

    /**
     * Specify the helper text to display below select
     */
    export let helperText = '';

    /**
     * Specify the label for the select
     */
    export let label = '';

    /**
     * Set an id for the input element. Id is used as the label `for` attribute
     */
    export let id = `fvs-${Math.random().toString(36)}`;

    /**
     * You can add actions to the components with use={[Action1, [Action2, action2Props], Action3]}.
     */
    export let use: UseActions = [];

    let text = '';
    let listEl: HTMLUListElement;
    let selectEl: HTMLSelectElement;
    let menuOpen = false;

    $: cssVarStyles = `
        --fvs-menu-text-align:${textAlignment};
        --fvs-menu-width:${selectWidth}px;
    `;

    $: props = {
        ...$$restProps,
        class: spreadClassnames([
            'fvs-select',
            invalid && 'fvs-select--error',
            disabled && 'fvs-select--disabled',
            textAlignment === 'right' && 'fvs-select--text-align-right',
            $$restProps.class,
        ]),
        style: cssVarStyles,
    };

    const buildOptions = () => {
        $collection.map((item) => selectEl.appendChild(item));
    };

    // Sets both hidden native select and styled select when custom
    // option clicked
    const setSelected = (val: string) => {
        for (let i = 0; i < selectEl.length; i += 1) {
            const currentOption = selectEl.options[i];
            const { value: currentOptionVal, text: currentOptionText } =
                currentOption;

            if (currentOptionVal === val) {
                // set native select element to selected index
                selectEl.selectedIndex = i;
                // set styled select value and text
                text = currentOptionText;
                value = currentOptionVal;
            }
        }
    };

    onMount(async () => {
        // Open menu to measure width - then match select width to menu surface width
        // (tick needed so that surface can be accurately measured)
        await tick();
        menuOpen = true;
        await tick();
        buildOptions();
        selectWidth = selectWidth || listEl.getBoundingClientRect().width;
        menuOpen = false;

        if (value) {
            setSelected(value);
        }
    });

    const dismissMenu = () => {
        if (menuOpen) {
            menuOpen = false;

            // trigger blur event for validation
            const blurEvent = new Event('blur');
            selectEl.dispatchEvent(blurEvent);
        }
    };

    const toggleMenu = () => {
        if (!disabled) {
            if (menuOpen) {
                dismissMenu();
            } else {
                menuOpen = true;
            }
        }
    };

    // Set value of styled select box to match value of native select
    const setCustomSelected = () => {
        const {
            text: selectedText,
            value: selectedValue,
            disabled: selectedDisabled,
        } = selectEl.options[selectEl.selectedIndex];
        if (!selectedDisabled) {
            text = selectedText;
            value = selectedValue;
        }
    };

    const collection = writable([]);
    setContext(TERROIR_SELECT_CONTEXT, {
        callback: (val: string) => {
            setSelected(val);
            dismissMenu();
        },
        collection,
    });
</script>

<style>
    .fvs-select {
        position: relative;

        display: inline-flex;
        flex-direction: column;
        align-items: flex-end;
        width: var(--fvs-menu-width);
    }

    .fvs-select :global(.select-dropdown-arrow-icon) {
        color: var(--t-color-icon-select-default);
    }

    .select-container {
        position: relative;

        width: 100%;
        height: 35px;
    }

    .fvs-select--text-align-right .select-button {
        justify-content: flex-end;
    }

    .select-button {
        position: absolute;
        top: 0;
        left: 0;

        display: none;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        width: var(--fvs-menu-width);
        height: 100%;

        padding: 0 var(--t-spacing-20) 0 var(--t-spacing-10);

        color: var(--t-color-text-primary);

        background: var(--t-color-background-select);
        border: none;

        border-color: var(--t-color-border-select-closed);
        border-style: solid;
        border-width: var(--t-border-width-select, 0 0 2px);
        border-radius: var(--t-radius-select);
        cursor: pointer;
    }

    @media (hover: hover) {
        .select-button {
            display: inline-flex;
        }

        .native-select {
            display: none;
        }

        .native-select:focus + .select-button {
            display: none;
        }
    }

    .select-button--menu-open,
    .native-select:focus,
    .native-select:active {
        border-color: var(--t-color-border-select-open);
    }

    .fvs-select--error .select-button {
        border-color: var(--t-color-border-select-error);
    }

    .fvs-select--disabled .select-button {
        color: var(--t-color-text-disabled);

        border-color: var(--t-color-border-select-disabled);
        cursor: default;
    }

    .fvs-select :global(.fvs-select-option) {
        text-align: var(--fvs-menu-text-align);
    }

    ul {
        margin: 0;
        padding: 0;

        list-style: none;
    }

    .placeholder-text {
        color: var(--t-color-text-tertiary);
    }

    .select-button-text {
        display: flex;
        align-items: center;
        padding-right: var(--t-spacing-10);
        overflow: hidden;
    }

    .text-container {
        padding-left: var(--t-spacing-05);
        overflow: hidden;

        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .fvs-select--error :global(.select-icon) {
        color: var(--t-color-border-select-error);
    }

    .fvs-select--disabled :global(.select-icon) {
        color: var(--t-color-text-disabled);
    }

    .native-select {
        display: inline-flex;
        align-items: center;
        width: 100%;
        height: 100%;

        padding: 0 var(--t-spacing-25) 0 var(--t-spacing-15);

        color: var(--t-color-text-primary);
        font-size: var(--t-font-body-size-primary);

        background: var(--t-color-background-select);
        border: none;

        border-color: var(--t-color-border-select-closed);
        border-style: solid;
        border-width: var(--t-border-width-select, 0 0 2px);
        border-radius: var(--t-radius-select);
        cursor: pointer;

        appearance: none;
    }

    .dropdown-arrow-container {
        position: absolute;
        top: 0;
        right: 0;

        display: flex;
        align-items: center;
        height: 100%;
        padding-right: var(--t-spacing-05);

        pointer-events: none;
    }

    .helper-field {
        position: absolute;
        top: 100%;

        color: var(--t-color-helper-select-default);
    }

    .select-label {
        display: flex;
        align-self: flex-start;
        padding-bottom: var(--t-spacing-05);

        color: var(--t-color-label-select-default);
    }

    .fvs-select--error .helper-field,
    .fvs-select--error .select-label {
        color: var(--t-color-border-select-error);
    }

    .fvs-select--disabled .helper-field,
    .fvs-select--disabled .select-label {
        color: var(--t-color-text-select-disabled);
    }

    .fvs-select--disabled :global(.select-dropdown-arrow-icon) {
        color: var(--t-color-text-select-disabled);
    }

    .fvs-select :global(.fvs-select-helper-icon) {
        color: var(--t-color-helper-select-default);
    }

    .fvs-select--error :global(.fvs-select-helper-icon) {
        color: var(--t-color-border-select-error);
    }

    .fvs-select--disabled :global(.fvs-select-helper-icon) {
        color: var(--t-color-helper-select-disabled);
    }

    .fvs-select :global(.fvs-select-surface .scrollable-content) {
        overflow-y: overlay;
    }
</style>

<div {...props} use:clickOutside={dismissMenu}>
    {#if label}
        <label for={id} class="select-label fvs-heading-75">{label}</label>
    {/if}
    <div class="select-container">
        <select
            class="native-select"
            on:blur={setCustomSelected}
            on:blur
            bind:this={selectEl}
            {disabled}
            {required}
            {name}
            {form}
            {id}
            use:useActions={use}
        >
            <option disabled selected value>
                {placeholder || '  '}
            </option>
        </select>

        <button
            class="select-button"
            class:select-button--menu-open={menuOpen}
            on:click
            on:focus
            type="button"
            on:click={toggleMenu}
            aria-hidden="true"
            tabIndex="-1"
        >
            <span class="select-button-text">
                {#if icon}
                    <Icon class="select-icon">{icon}</Icon>
                {/if}
                <span class="text-container">
                    {#if text}
                        {text}
                    {:else}
                        <span class="placeholder-text">{placeholder}</span>
                    {/if}
                </span>
            </span>
        </button>
        <div class="dropdown-arrow-container" aria-hidden="true">
            {#if menuOpen}
                <Icon class="select-dropdown-arrow-icon">arrow_drop_up</Icon>
            {:else}
                <Icon class="select-dropdown-arrow-icon">arrow_drop_down</Icon>
            {/if}
        </div>
    </div>

    {#if menuOpen}
        <MenuSurface {position} animation={slide} class="fvs-select-surface">
            <ul role="listbox" tabindex="-1" bind:this={listEl}>
                <slot />
            </ul>
        </MenuSurface>
    {/if}

    {#if helperText}
        <small class="helper-field">
            <span class="fvs-text-field-helper-icon">
                <Icon size="tertiary" class="fvs-select-helper-icon">
                    help_outline
                </Icon>
            </span>
            {helperText}
        </small>
    {/if}
</div>
