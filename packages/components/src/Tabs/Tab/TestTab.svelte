<script type="ts">
    import { setContext } from 'svelte';
    import Tab from './Tab.svelte';

    export let slotContent = '';

    export let contextKey;
    export let contextValue;

    setContext(contextKey, contextValue);
</script>

<Tab {...$$restProps}>{slotContent}</Tab>
