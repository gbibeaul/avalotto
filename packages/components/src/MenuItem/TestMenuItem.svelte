<script>
    import Avatar from '../Avatar/Avatar.svelte';
    import MenuItem from './MenuItem.svelte';

    export let value = 'Value';
    export let description = '';
    export let helper = '';
    export let label = '';
    export let avatarName = '';
</script>

{#if label}
    <MenuItem {...$$restProps}>
        <span>{value}</span>
        <span slot="description">{description}</span>
        <span slot="helper">{helper}</span>
        <span slot="label">{label}</span>
    </MenuItem>
{:else if avatarName}
    <MenuItem {...$$restProps}>
        <Avatar slot="avatar" name={avatarName} />
        <span>{value}</span>
        <span slot="description">{description}</span>
        <span slot="helper">{helper}</span>
    </MenuItem>
{:else}
    <MenuItem {...$$restProps}>
        <span>{value}</span>
        <span slot="description">{description}</span>
        <span slot="helper">{helper}</span>
    </MenuItem>
{/if}
