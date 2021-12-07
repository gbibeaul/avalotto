<script lang="ts">
    import Button from '../Button/Button.svelte';
    import Dialog from './Dialog.svelte';
    import DialogTitle from './DialogTitle.svelte';
    import DialogContent from './DialogContent.svelte';
    import DialogActions from './DialogActions.svelte';
    import type { DialogApi } from './constants';

    let dialog: DialogApi;
</script>

<Dialog {...$$restProps} bind:this={dialog}>
    <DialogTitle>Dialog</DialogTitle>
    <DialogContent>This is a dialog.</DialogContent>
    <DialogActions>
        <Button variant="secondary" on:click={dialog.close}>Cancel</Button>
    </DialogActions>
</Dialog>
<Button on:click={() => dialog.open()}>Open Dialog</Button>
