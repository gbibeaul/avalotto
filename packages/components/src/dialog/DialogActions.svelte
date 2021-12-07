<style>
    .fvs-dialog-actions {
        display: flex;
        flex-shrink: 0;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-end;
        padding: 20px;
    }

    .fvs-dialog-actions :global(.fvs-button) {
        max-width: 100%;
        margin-right: 0;
        margin-left: 8px;

        text-align: right;
    }

    .fvs-dialog-actions :global(.fvs-button:first-child) {
        margin-right: 0;
        margin-left: 0;
    }
</style>

<div class="fvs-dialog-actions">
    <slot />
</div>
