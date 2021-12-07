<script type="ts">
    import { setContext } from 'svelte';
    import SelectOption from './SelectOption.svelte';

    export let slotContent = '';
    export let value = '';

    export let contextKey;
    export let contextValue;
    export let onClick: () => void;

    setContext(contextKey, contextValue);

    $: props = {
        value,
        ...$$restProps,
    };
</script>

<SelectOption on:click={onClick} {...props}>{slotContent}</SelectOption>
