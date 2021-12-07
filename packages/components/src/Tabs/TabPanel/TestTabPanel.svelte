<script type="ts">
    import { setContext } from 'svelte';
    import TabPanel from './TabPanel.svelte';

    export let slotContent = '';

    export let contextKey;
    export let contextValue;

    setContext(contextKey, contextValue);
</script>

<TabPanel {...$$restProps}>{slotContent}</TabPanel>
