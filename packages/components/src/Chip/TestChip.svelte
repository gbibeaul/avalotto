<script>
    import Chip from './Chip.svelte';

    export let content = 'Chip Component';

    const handleClick = () => {
        content = 'clicked!';
    };
</script>

<Chip {content} on:click={handleClick} {...$$restProps} />
