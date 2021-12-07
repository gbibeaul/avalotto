<script type="ts">
    import ItemContent from './ItemContent.svelte';

    export let value: string;
    export let description: string;
</script>

<div style="max-width: 200px">
    {#if description}
        <ItemContent {...$$restProps}>
            <span>{value}</span>
            <span slot="description">{description}</span>
        </ItemContent>
    {:else}
        <ItemContent {...$$restProps}>
            <span>{value}</span>
        </ItemContent>
    {/if}
</div>
