<script>
    import Tooltip from './Tooltip.svelte';
</script>

<Tooltip {...$$restProps}>
    <div>X</div>
    <span slot="content">Tooltip</span>
</Tooltip>
