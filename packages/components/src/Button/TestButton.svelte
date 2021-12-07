<script>
    import Button from './Button.svelte';

    export let content = 'Button';
    export let clickHandler;
    export let mouseoverHandler;
    export let mouseenterHandler;
    export let mouseleaveHandler;
</script>

<Button
    on:click={clickHandler}
    on:mouseenter={mouseenterHandler}
    on:mouseleave={mouseleaveHandler}
    on:mouseover={mouseoverHandler}
    {...$$restProps}
>
    {content}
</Button>
