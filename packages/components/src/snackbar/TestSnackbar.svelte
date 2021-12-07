<script lang="ts">
    import Button from '../Button/Button.svelte';
    import Snackbar from './Snackbar.svelte';
    import type { SnackbarApi } from './constants';

    let snackbar: SnackbarApi;
</script>

<Snackbar {...$$restProps} bind:this={snackbar}>This is a snackbar.</Snackbar>
<Button on:click={() => snackbar.open()}>Open Snackbar</Button>
