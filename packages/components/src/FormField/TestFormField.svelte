<script lang="ts">
    import FormField from './FormField.svelte';

    export let slotContent: HTMLElement;
    export let label = '';
</script>

<FormField {...$$restProps}>
    {slotContent}
    <span slot="label">{label}</span>
</FormField>
