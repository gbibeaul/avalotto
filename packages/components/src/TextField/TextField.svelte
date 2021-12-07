<script lang="ts">
    import { spreadClassnames, useActions } from '../utils';
    import type { UseActions } from '../utils';
    import Icon from '../Icon/Icon.svelte';

    /* ==== Component props ==== */
    /** Align input text to the center or right, generally for numbers.
     *  Labels, icons, and helper text should not be applied when using a custom alignment.
     */
    export let align: 'center' | 'right' | 'left' = 'left';

    /** Set max number of characters for the input. Will show a counter.
     */
    export let maxCharCount = 0;

    /** Set to `true` to disable the input.
     *
     * $$restProps.disabled
     */

    /** Text to display below the input.
     */
    export let helperText = '';

    /** Set an icon in the input.
     */
    export let icon: string = null;

    /** Set an id for the input element. Id is used as the label `for` attribute as well as for
     *  programmatic focus on this input.
     */
    export let id = `fvs-${Math.random().toString(36)}`;

    /** Set to `true` to indicate an invalid state.
     */
    export let invalid = false;

    /** Specify the label text.
     */
    export let labelText = '';

    /**
     * Specify a name attribute for the input.
     *
     * $$restProps.name
     */

    /** Specify the placeholder text.
     *
     * $$restProps.placeholder
     */

    /** Obtain a reference to the input HTML element */
    export let ref: HTMLInputElement = null;

    /**
     * Specify the variant of the input.
     */
    export let variant: 'default' | 'large' = 'default';

    /**
     * Specify the input value.
     */
    export let value = '';

    /** Set to `true` to mark the field as required.
     *
     * $$restProps.required
     */

    /** Set to `true` to remove full-width settings on the input (sets to default input widths).
     *  The default browser width is attribute size=20.
     */
    export let defaultWidth = false;

    /** Set to `true` to force focused state.
     */
    export let focused = false;

    /** Set to the input size attribute value. Usually only relevant when you want an input to be less
     * then the default browser width (20).
     *
     * $$restProps.size
     */

    /** Set the input type */
    export let type = 'text';

    /**
     * You can add actions to the components with use={[Action1, [Action2, action2Props], Action3]}.
     */
    export let use: UseActions = [];

    /* ==== Component methods ==== */

    const handleInputFocus = () => {
        focused = true;
    };

    const handleInputBlur = () => {
        focused = false;
    };

    const focusInput = (e: Event) => {
        e.preventDefault();
        document.getElementById(id).focus();
    };

    $: valueLength = value.length;

    let fvsTextFieldClasses: string;

    $: fvsTextFieldClasses = spreadClassnames([
        'fvs-text-field',
        focused && 'fvs-text-field--focused',
        (defaultWidth || $$restProps.size < 20) &&
            'fvs-text-field--default-width',
        $$restProps.disabled && 'fvs-text-field--disabled',
        invalid && 'fvs-text-field--error',
        icon && 'fvs-text-field--search',
        align === 'center' && 'fvs-text-field--center-align',
        align === 'right' && 'fvs-text-field--right-align',
        variant === 'large' && 'fvs-text-field--large',
        $$restProps.size === 1 && 'fvs-text-field--sm-min-size',
        $$restProps.class,
    ]);

    let restProps: {
        class: string;
    };

    $: restProps = {
        ...$$restProps,
        class: '',
    };

    $: if (ref && type) {
        ref.setAttribute('type', type);
    }

    let iconColor = '--t-color-font-text-field-icon';
    $: {
        if ($$restProps.disabled) {
            iconColor = '--t-color-font-text-field-disabled';
        } else if (invalid) {
            iconColor = '--t-color-font-text-field-error';
        } else if (focused) {
            iconColor = '--t-color-font-text-field-icon-focus';
        } else {
            iconColor = '--t-color-font-text-field-icon';
        }
    }

    let helperIconColor = '--t-color-font-text-field-empty';
    $: {
        if ($$restProps.disabled) {
            helperIconColor = '--t-color-font-text-field-disabled';
        } else if (invalid) {
            helperIconColor = '--t-color-font-text-field-error';
        } else {
            helperIconColor = '--t-color-font-text-field-empty';
        }
    }
</script>

<style>
    /* Input wrappers */
    .fvs-text-field {
        display: flex;

        flex: 1 1 auto;
        flex-direction: column;
        align-items: flex-start;

        min-width: 47px;
        max-width: 768px;
    }

    .fvs-text-field--sm-min-size {
        min-width: 33px;
    }

    .fvs-text-field-input-wrapper {
        position: relative;

        display: flex;
        align-items: center;

        width: 100%;
    }

    /* Input */
    .fvs-text-field-input {
        width: 100%;
        height: 35px;
        padding: 0 var(--t-spacing-10);

        color: var(--t-color-font-text-field);

        font-size: var(--t-font-body-size-primary);
        line-height: var(
            --t-font-body-size-primary
        ); /* line-height of inputs is an exception to general font-sizing rules */

        background: var(--t-color-background-text-field);
        border-color: var(--t-color-border-text-field-unfocused);
        border-style: solid;
        border-width: var(--t-border-width-text-field, 0 0 2px);
        border-radius: var(--t-radius-text-field);

        outline: none !important;
    }

    .fvs-text-field--focused .fvs-text-field-input,
    .fvs-text-field-input:focus {
        border-color: var(--t-color-border-text-field-focused);
    }

    .fvs-text-field--disabled .fvs-text-field-input {
        color: var(--t-color-font-text-field-disabled);

        border-color: var(--t-color-border-text-field-disabled);
    }

    .fvs-text-field--error .fvs-text-field-input {
        border-color: var(--t-color-border-text-field-error);
    }

    .fvs-text-field--center-align .fvs-text-field-input {
        text-align: center;
    }

    .fvs-text-field--right-align .fvs-text-field-input {
        text-align: right;
    }

    .fvs-text-field--large .fvs-text-field-input {
        width: 100%;
        height: 50px;
        padding: 0 var(--t-spacing-15);

        font-size: var(--t-font-body-size-secondary);
        line-height: var(--t-font-body-size-secondary);
    }

    .fvs-text-field--search .fvs-text-field-input {
        width: 100%;
        padding-left: 34px;
    }

    .fvs-text-field--large.fvs-text-field--search .fvs-text-field-input {
        width: 100%;
        padding-left: 40px;
    }

    .fvs-text-field--default-width {
        flex: none;
    }

    .fvs-text-field--default-width .fvs-text-field-input-wrapper {
        width: auto;
    }

    /* Placeholder */
    .fvs-text-field-input::placeholder {
        color: var(--t-color-font-text-field-empty);
    }

    .fvs-text-field--disabled .fvs-text-field-input::placeholder {
        color: var(--t-color-font-text-field-disabled);
    }

    /* Label */
    .fvs-text-field-label {
        --label-color: var(--t-color-font-text-field-label);
    }

    .fvs-text-field--disabled .fvs-text-field-label {
        --label-color: var(--t-color-font-text-field-disabled);
    }

    .fvs-text-field--error .fvs-text-field-label {
        --label-color: var(--t-color-font-text-field-error);
    }

    .fvs-text-field-label {
        margin-bottom: 4px;
        padding-left: var(--t-spacing-10);

        color: var(--label-color);

        font-weight: 700;
        font-size: 1.2rem;
        line-height: 1.6rem;
    }

    /* Input Icon */
    .fvs-text-field .fvs-text-field-icon {
        position: absolute;
        left: var(--t-spacing-10);

        display: flex;

        cursor: default;
    }

    /* Helper text */
    .fvs-text-input-help-wrapper {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .fvs-text-field-helper {
        display: flex;
        align-items: center;
        justify-content: center;

        margin-top: var(--t-spacing-05);

        color: var(--t-color-font-text-field-empty);

        font-size: var(--t-font-body-size-tertiary);
        line-height: var(--t-font-body-line-height-tertiary);
    }

    .fvs-text-field--disabled .fvs-text-field-helper {
        color: var(--t-color-font-text-field-disabled);
    }

    .fvs-text-field--error .fvs-text-field-helper {
        color: var(--t-color-font-text-field-error);
    }

    .fvs-text-field-helper-icon {
        margin: 0 var(--t-spacing-05) 0 0;

        cursor: default;
    }
    /* Character counter */
    .fvs-text-input-char-count {
        margin-top: var(--t-spacing-05);

        color: var(--t-color-font-text-field);

        font-size: var(--t-font-body-size-tertiary);
        line-height: var(--t-font-body-line-height-tertiary);

        opacity: 0;
    }

    .fvs-text-input-char-count--visible {
        opacity: 1;
    }

    .fvs-text-input-char-count--exceeded {
        color: var(--t-color-font-text-field-error);
    }
</style>

<div class={fvsTextFieldClasses}>
    {#if labelText && variant === 'default'}
        <label class="fvs-text-field-label" for={id}>{labelText}</label>
    {/if}
    <div class="fvs-text-field-input-wrapper">
        {#if icon && align === 'left'}
            <span class="fvs-text-field-icon">
                <Icon
                    on:click={focusInput}
                    size={variant === 'default' ? 'primary' : 'secondary'}
                    class="additional"
                    color={iconColor}>{icon}</Icon
                >
            </span>
        {/if}
        <input
            on:change
            on:keydown
            on:focus
            on:focus={handleInputFocus}
            on:blur
            on:blur={handleInputBlur}
            bind:this={ref}
            bind:value
            use:useActions={use}
            {...restProps}
            class="fvs-text-field-input"
            {id}
        />
    </div>
    <div class="fvs-text-input-help-wrapper">
        <small class="fvs-text-field-helper">
            {#if helperText && variant === 'default' && align === 'left'}
                <span class="fvs-text-field-helper-icon">
                    <Icon
                        on:click={focusInput}
                        size="tertiary"
                        color={helperIconColor}>help_outline</Icon
                    >
                </span>
                {helperText}
            {/if}
        </small>
        <small
            class="fvs-text-input-char-count"
            class:fvs-text-input-char-count--visible={(focused &&
                maxCharCount) ||
                (focused && maxCharCount > 0) ||
                (maxCharCount > 0 && valueLength > maxCharCount)}
            class:fvs-text-input-char-count--exceeded={valueLength >
                maxCharCount}
        >
            {valueLength}/{maxCharCount}
        </small>
    </div>
</div>
