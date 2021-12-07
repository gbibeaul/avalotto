<script type="ts">
    import { setContext } from 'svelte';

    import TabList from './TabList.svelte';

    export let slotContent = '';

    export let contextKey;
    export let contextValue;

    setContext(contextKey, contextValue);
</script>

<TabList {...$$restProps}>{slotContent}</TabList>
