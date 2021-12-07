<script type="ts">
    import { spreadClassnames, useActions } from '../utils';
    import type { UseActions } from '../utils';

    /**
     * Specify the group value
     */
    export let group: string | number = '';

    /**
     * Specify value of the radio input
     */
    export let value: string | number;

    /**
     * You can add actions to the components with use={[Action1, [Action2, action2Props], Action3]}.
     */
    export let use: UseActions = [];

    let restProps = {};
    let className = '';

    $: ({ class: className, ...restProps } = $$restProps);

    $: props = {
        class: spreadClassnames(['fvs-radio', className]),
    };
</script>

<style>
    .custom-radio {
        --radio-border-color: var(--t-color-text-primary);
    }

    .custom-radio:after {
        --radio-center-color: var(--t-color-background-control-active);
    }

    input:disabled {
        cursor: default;
    }

    input:checked ~ .custom-radio {
        --radio-border-color: var(--t-color-background-control-active);
    }

    input:disabled ~ .custom-radio {
        --radio-border-color: var(--t-color-text-disabled);
    }

    input:checked:disabled ~ .custom-radio:after {
        --radio-center-color: var(--t-color-text-disabled);
    }

    input:hover:not(:disabled):not(:checked) ~ .custom-radio {
        --radio-border-color: var(--t-color-text-secondary);
    }

    input:checked ~ .custom-radio:after {
        display: block;

        transform: scale(1, 1);
    }

    .fvs-radio {
        position: relative;

        flex-shrink: 0;

        align-items: flex-end;
        width: 20px;

        height: 20px;
        margin-right: var(--t-spacing-05);
    }

    .custom-radio {
        position: absolute;
        top: 0;
        left: 0;

        width: 20px;
        height: 20px;

        border: 2px solid;
        border-color: var(--radio-border-color);
        border-radius: 50%;
    }

    .custom-radio:after {
        position: absolute;
        top: 3px;
        left: 3px;

        width: 10px;
        height: 10px;

        background-color: var(--radio-center-color);
        border-radius: 50%;

        transform: scale(0, 0);

        transition: transform 0.2s ease-out;

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
        type="radio"
        bind:group
        {value}
        use:useActions={use}
        {...restProps}
    />
    <span class="custom-radio" />
</span>
