<script lang="ts">
    import PageTitleIcon from './PageTitleIcon.svelte';

    export let slotContent: HTMLElement;
</script>

<PageTitleIcon>
    {slotContent}
</PageTitleIcon>
