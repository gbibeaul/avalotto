<div class="gbs-dialog-actions">
  <slot />
</div>

<style>
  .gbs-dialog-actions {
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    padding: 20px;
  }

  .gbs-dialog-actions :global(.gbs-button) {
    max-width: 100%;
    margin-right: 0;
    margin-left: 8px;

    text-align: right;
  }

  .gbs-dialog-actions :global(.gbs-button:first-child) {
    margin-right: 0;
    margin-left: 0;
  }
</style>
