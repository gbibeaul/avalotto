<script lang="ts">
    import { writable } from 'svelte/store';
    import DialogSurface from './DialogSurface.svelte';
    import { focusTrap, scrollLock, spreadClassnames } from '../utils';
    import DialogSkrim from './DialogSkrim.svelte';

    /**
     * Specify the dialog variant
     */
    export let variant: 'default' | 'alert' = 'default';

    /**
     * Fullscreen dialog on mobile sized screens
     */
    export let fullscreen = false;

    const isOpen = writable(false);

    export function open() {
        isOpen.set(true);
    }

    export function close() {
        isOpen.set(false);
    }

    function handleKeydown(event: KeyboardEvent): void {
        if ($isOpen && event.key === 'Escape') {
            close();
        }
    }

    $: props = {
        ...$$restProps,
        class: spreadClassnames([
            'fvs-dialog',
            variant === 'alert' && `fvs-dialog--alert`,
            fullscreen && 'fvs-dialog--fullscreen',
            $$restProps.class,
        ]),
    };
</script>

<style>
    .fvs-dialog {
        position: fixed;
        top: 0;
        left: 0;

        z-index: 1000;

        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .fvs-dialog-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        height: 100%;

        pointer-events: none;
    }

    .fvs-dialog :global(.fvs-dialog-surface) {
        max-height: calc(100% - 32px);
    }

    .fvs-dialog :global(.fvs-dialog-surface) {
        min-width: 350px;
    }

    .fvs-dialog.fvs-dialog--alert :global(.fvs-dialog-title) {
        padding-bottom: 15px;
    }

    @media screen and (max-width: 767px) {
        .fvs-dialog :global(.fvs-dialog-surface) {
            max-width: calc(100vw - 32px);
        }

        .fvs-dialog.fvs-dialog--fullscreen :global(.fvs-dialog-surface) {
            width: 100vw;
            max-width: 100vw;
            height: 100vh;
            max-height: 100vh;
        }
    }

    @media screen and (min-width: 768px) {
        .fvs-dialog :global(.fvs-dialog-surface) {
            max-width: 560px;
        }
    }
</style>

<svelte:window on:keydown={handleKeydown} />

{#if $isOpen}
    <div {...props} role="dialog" tabindex="-1" use:focusTrap use:scrollLock>
        <div class="fvs-dialog-container">
            <DialogSurface>
                <slot />
            </DialogSurface>
        </div>
        <DialogSkrim />
    </div>
{/if}
