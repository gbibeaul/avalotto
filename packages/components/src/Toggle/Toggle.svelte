<script lang="ts">
    import { spreadClassnames } from '../utils';

    /**
     * Specifies the checked state of the toggle
     */
    export let checked = false;

    let restProps = {};
    let className = '';

    $: ({ class: className, ...restProps } = $$restProps);

    $: props = {
        class: spreadClassnames(['fvs-toggle', className]),
    };
</script>

<style>
    .custom-toggle {
        --toggle-background-color: var(--t-color-text-tertiary);
    }

    .custom-toggle:before {
        --toggle-center-position: 2px;
    }

    input:hover:not(:disabled) ~ .custom-toggle {
        --toggle-background-color: var(--t-color-text-secondary);
    }

    input:checked ~ .custom-toggle {
        --toggle-background-color: var(--t-color-background-control-active);
    }

    input:checked:disabled ~ .custom-toggle {
        --toggle-background-color: var(
            --t-color-background-control-active-disabled
        );
    }

    input:checked ~ .custom-toggle:before {
        --toggle-center-position: 12px;
    }

    input:checked:hover:not(:disabled) ~ .custom-toggle {
        --toggle-background-color: var(
            --t-color-background-control-active-hover
        );
    }

    input:disabled {
        cursor: default;
    }

    input:disabled ~ .custom-toggle {
        --toggle-background-color: var(--t-color-text-disabled);
    }

    .fvs-toggle {
        position: relative;

        display: inline-flex;

        flex-shrink: 0;

        align-items: flex-end;
        align-items: center;
        justify-content: center;
        width: 25px;

        height: 20px;
        margin-right: var(--t-spacing-05);
    }
    .custom-toggle {
        position: absolute;

        display: flex;
        align-items: center;
        width: 24px;
        height: 14px;

        background-color: var(--toggle-background-color);
        border-radius: 7.5px;
    }

    .custom-toggle:before {
        position: absolute;
        left: var(--toggle-center-position);

        width: 10px;
        height: 10px;

        background-color: white;
        border-radius: 50%;

        transition: all 0.2s;

        content: '';
    }

    input {
        position: absolute;
        z-index: 1;

        width: 20px;
        height: 20px;
        margin: 0;

        cursor: pointer;
        opacity: 0;
    }
</style>

<span {...props}>
    <input
        type="checkbox"
        bind:checked
        aria-checked={checked}
        on:change|capture
        {...restProps}
    />
    <span class="custom-toggle" />
</span>
