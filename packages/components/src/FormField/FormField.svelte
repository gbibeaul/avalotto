<script lang="ts">
    import { spreadClassnames } from '../utils';

    /**
     * Specify the label placement in regards to the control. Defaults to right
     */
    export let labelPlacement: 'right' | 'left' = 'right';

    /**
     * Specify the whether the label should have disabled style (should be used with a disabled control only)
     */
    export let disabled = false;

    $: props = {
        ...$$restProps,
        class: spreadClassnames([
            'fvs-form-field',
            disabled && 'fvs-form-field--disabled',
            labelPlacement && `fvs-form-field--label-${labelPlacement}`,
            $$restProps.class,
        ]),
    };
</script>

<style>
    .fvs-form-field {
        display: flex;

        cursor: pointer;
    }

    .fvs-form-field--label-left {
        flex-flow: row-reverse;
        justify-content: space-between;
    }

    .fvs-form-field--disabled {
        color: var(--t-color-text-disabled);

        cursor: default;
    }
</style>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label {...props}>
    <slot />
    <slot name="label" />
</label>
