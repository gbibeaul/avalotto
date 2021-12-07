<script context="module" lang="ts">
    import { writable } from 'svelte/store';
    import SnackbarViewer from './snackbar-viewer';

    const snackbarViewer = SnackbarViewer();
</script>

<script lang="ts">
    import { SnackbarDuration, SnackbarPosition } from './constants';
    import { spreadClassnames } from '../utils';
    import SnackbarSurface from './SnackbarSurface.svelte';

    /**
     * Specify the snackbar position
     */
    export let position: SnackbarPosition = SnackbarPosition.BOTTOM;

    /**
     * Specify the automatic dismiss timeout in milliseconds
     */
    export let duration: SnackbarDuration = SnackbarDuration.SHORT;

    let restProps = {};
    let className = '';

    $: ({ class: className, ...restProps } = $$restProps);

    $: props = {
        class: spreadClassnames([
            'snackbar-wrapper',
            position && `snackbar-wrapper--${position}`,
            className,
        ]),
    };

    const opened = writable(false);

    export function open(): void {
        snackbarViewer.open(opened, { autoDismissTimeoutMs: duration });
    }

    export function close(): void {
        snackbarViewer.close(opened);
    }
</script>

<style>
    .snackbar-wrapper {
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1000;

        display: flex;
        align-items: center;
        justify-content: center;
        margin: var(--t-spacing-50);
    }

    @media (max-width: 480px), (max-width: 344px) {
        .snackbar-wrapper {
            margin: var(--t-spacing-15);
        }
    }

    .snackbar-wrapper--bottom-start {
        justify-content: flex-start;
    }

    .snackbar-wrapper--bottom-end {
        justify-content: flex-end;
    }
</style>

{#if $opened}
    <div {...props}>
        <SnackbarSurface>
            <slot />
            <slot slot="action" name="action" />
        </SnackbarSurface>
    </div>
{/if}
