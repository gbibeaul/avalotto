<script type="ts">
    import { getContext } from 'svelte';
    import { TERROIR_TAB_CONTEXT } from '../constants';

    const panelId = Math.random().toString(36);

    const { registerPanel, selectedIndex, panels } =
        getContext(TERROIR_TAB_CONTEXT);

    $: if (registerPanel) {
        registerPanel(panelId);
    }
</script>

{#if panels[$selectedIndex] === panelId}
    <div>
        <slot />
    </div>
{/if}
