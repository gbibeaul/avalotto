<script lang="ts">
    import PageTitleActions from './PageTitleActions.svelte';

    export let slotContent: HTMLElement;

    export let noWrap = false;
</script>

<PageTitleActions {noWrap}>
    {slotContent}
</PageTitleActions>
