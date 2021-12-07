<script type="ts">
    import MenuSurface from './MenuSurface.svelte';

    export let slotContent: HTMLElement;
</script>

<MenuSurface {...$$restProps}>{slotContent}</MenuSurface>
