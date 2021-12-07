<script lang="ts">
  import { scale } from "svelte/transition";
</script>

<div class="gbs-dialog-surface" in:scale={{ duration: 300, start: 0.1 }}>
  <slot />
</div>

<style>
  .gbs-dialog-surface {
    position: relative;

    display: flex;
    flex-direction: column;
    flex-grow: 0;
    flex-shrink: 0;
    max-width: 100%;
    max-height: 100%;
    overflow-y: auto;

    background-color: var(--t-color-background-dialog);

    box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%),
      0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);

    pointer-events: auto;
  }
</style>
