<script type="ts">
    import { onDestroy, setContext } from 'svelte';
    import { writable } from 'svelte/store';
    import { TERROIR_TAB_CONTEXT } from './constants';

    /**
     * Specify if tabs should spread out to take up full width of container
     */
    export let fullWidth = false;

    const tabs = writable<string[]>([]);
    const panels: string[] = [];
    const longestTab = writable(null);
    const selectedIndex = writable(0);

    setContext(TERROIR_TAB_CONTEXT, {
        registerTab: (tabId: string) => {
            tabs.update((tabList) => [...tabList, tabId]);

            onDestroy(() => {
                tabs.update((tabList) => tabList.filter((i) => i !== tabId));
                selectedIndex.update((curr) =>
                    Math.min($tabs.length - 1, curr)
                );
            });
        },
        registerPanel: (panelId: string) => {
            panels.push(panelId);

            onDestroy(() => {
                const i = panels.indexOf(panelId);
                panels.splice(i, 1);
                selectedIndex.update((curr) =>
                    Math.min($tabs.length - 1, curr)
                );
            });
        },
        selectTab: (tabId: string) => {
            selectedIndex.set($tabs.indexOf(tabId));
        },
        selectedIndex,
        longestTab,
        tabs,
        panels,
        fullWidth,
    });
</script>

<div>
    <slot />
</div>
