<script lang="ts">
    import PageTitleText from './PageTitleText.svelte';

    export let slotContent: HTMLElement;
    export let subtitle = '';
</script>

<PageTitleText>
    {slotContent}
    <span slot="subtitle">{subtitle}</span>
</PageTitleText>
