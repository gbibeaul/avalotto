<script>
    import Menu from './Menu.svelte';
    import MenuItem from '../MenuItem/MenuItem.svelte';

    export let handleClick;
</script>

<Menu {...$$restProps}>
    <MenuItem on:click={handleClick}>
        <span>One</span>
    </MenuItem>
    <MenuItem>
        <span>Two</span>
    </MenuItem>
</Menu>
