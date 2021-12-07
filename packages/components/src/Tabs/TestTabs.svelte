<script type="ts">
    import Tabs from './Tabs.svelte';

    export let slotContent = '';
</script>

<Tabs {...$$restProps}>{slotContent}</Tabs>
