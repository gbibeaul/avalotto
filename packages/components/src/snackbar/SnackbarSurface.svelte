<script lang="ts">
  import { fly } from "svelte/transition";
  import { backInOut } from "svelte/easing";
  import { ANIMATION_TIME_MS } from "./constants";
</script>

<div
  class="gbs-snackbar-surface"
  role="status"
  aria-live="polite"
  transition:fly={{ y: 100, easing: backInOut, duration: ANIMATION_TIME_MS }}
>
  <span class="snackbar-label"><slot /></span>
  <div class="snackbar-actions"><slot name="action" /></div>
</div>

<style>
  .gbs-snackbar-surface {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    min-width: 565px;
    max-width: 1340px;
    padding-right: 7.5px;

    background-color: var(--t-color-background-snackbar);

    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.14),
      0px 2px 4px -1px rgba(0, 0, 0, 0.12), 0px 1px 10px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 480px), (max-width: 344px) {
    .gbs-snackbar-surface {
      min-width: 100%;
    }
  }

  .snackbar-label {
    flex-grow: 1;
    width: 100%;
    padding: var(--t-spacing-15) 7.5px var(--t-spacing-15) var(--t-spacing-15);

    color: var(--t-color-text-primary);
    font-size: var(--t-font-body-size-primary);
    line-height: var(--t-font-body-line-height-primary);

    word-break: break-word;
  }

  .snackbar-actions {
    display: flex;
    flex-shrink: 0;
    align-items: center;
  }
</style>
