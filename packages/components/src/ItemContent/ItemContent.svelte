<script lang="ts">
  import Icon from "../Icon/Icon.svelte";
  import { TooltipPosition } from "../Tooltip/constants";
  import type { TooltipPositionType } from "../Tooltip/constants";
  import Tooltip from "../Tooltip/Tooltip.svelte";
  import { spreadClassnames } from "../utils";

  /**
   * Makes component appear disabled
   */
  export let disabled = false;

  /**
   * Specify the leading icon show before the text
   */
  export let icon = "";

  /**
   * Specify the position of tooltips triggered by the helper icon or overflow text
   * @type {'bottom' | 'bottom-start' | 'bottom-end' | 'top' | 'top-start' | 'top-end'}
   */
  export let tooltipPositioning: TooltipPositionType = TooltipPosition.BOTTOM;

  // Used for determining if text extends past max width
  // in which case we dispaly Tooltip on hover
  let valueContainer: HTMLElement;

  $: props = {
    ...$$restProps,
    class: spreadClassnames([
      "gbs-item-content",
      "gbs-body-primary",
      disabled && "disabled",
      $$restProps.class,
    ]),
  };
</script>

<div {...props}>
  {#if icon}
    <div class="item-content-icon-container">
      <Icon
        color={disabled
          ? "--t-color-text-disabled"
          : "--t-color-text-secondary"}
      >
        {icon}
      </Icon>
    </div>
  {/if}
  <div class="item-content-text">
    {#if $$slots.description}
      <slot />
      <div class="gbs-body-tertiary" class:disabled>
        <slot name="description" />
      </div>
    {:else}
      <div class="max-width-slot-container" bind:this={valueContainer}>
        <slot />
      </div>
    {/if}
  </div>

  {#if valueContainer && valueContainer.scrollWidth > valueContainer.clientWidth}
    <Tooltip
      variant="descriptive"
      position={tooltipPositioning}
      class="gbs-item-content-tooltip"
    >
      <div class="tooltip-trigger" />
      <slot slot="content" />
    </Tooltip>
  {/if}
</div>

<style>
  .gbs-item-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    overflow: hidden;
  }

  .max-width-slot-container {
    overflow: hidden;

    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-content-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 0 var(--t-spacing-05);
    overflow: hidden;
  }

  .gbs-body-tertiary {
    color: var(--t-color-text-tertiary);
  }
  .disabled {
    color: var(--t-color-text-disabled);
  }

  .tooltip-trigger {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .gbs-item-content :global(.gbs-item-content-tooltip) {
    position: absolute;

    width: 100%;

    padding-bottom: var(--t-spacing-10);
  }

  .item-content-icon-container {
    line-height: 1;
  }
</style>
