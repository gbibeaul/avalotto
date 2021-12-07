<script lang="ts">
  import { writable } from "svelte/store";
  import DialogSurface from "./DialogSurface.svelte";
  import { focusTrap, scrollLock, spreadClassnames } from "../utils";
  import DialogSkrim from "./DialogSkrim.svelte";

  /**
   * Specify the dialog variant
   */
  export let variant: "default" | "alert" = "default";

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
    if ($isOpen && event.key === "Escape") {
      close();
    }
  }

  $: props = {
    ...$$restProps,
    class: spreadClassnames([
      "gbs-dialog",
      variant === "alert" && `gbs-dialog--alert`,
      fullscreen && "gbs-dialog--fullscreen",
      $$restProps.class,
    ]),
  };
</script>

<svelte:window on:keydown={handleKeydown} />

{#if $isOpen}
  <div {...props} role="dialog" tabindex="-1" use:focusTrap use:scrollLock>
    <div class="gbs-dialog-container">
      <DialogSurface>
        <slot />
      </DialogSurface>
    </div>
    <DialogSkrim />
  </div>
{/if}

<style>
  .gbs-dialog {
    position: fixed;
    top: 0;
    left: 0;

    z-index: 1000;

    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .gbs-dialog-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    height: 100%;

    pointer-events: none;
  }

  .gbs-dialog :global(.gbs-dialog-surface) {
    max-height: calc(100% - 32px);
  }

  .gbs-dialog :global(.gbs-dialog-surface) {
    min-width: 350px;
  }

  .gbs-dialog.gbs-dialog--alert :global(.gbs-dialog-title) {
    padding-bottom: 15px;
  }

  @media screen and (max-width: 767px) {
    .gbs-dialog :global(.gbs-dialog-surface) {
      max-width: calc(100vw - 32px);
    }

    .gbs-dialog.gbs-dialog--fullscreen :global(.gbs-dialog-surface) {
      width: 100vw;
      max-width: 100vw;
      height: 100vh;
      max-height: 100vh;
    }
  }

  @media screen and (min-width: 768px) {
    .gbs-dialog :global(.gbs-dialog-surface) {
      max-width: 560px;
    }
  }
</style>
