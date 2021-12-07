<script lang="ts">
  import Icon from "../Icon/Icon.svelte";
  import { spreadClassnames } from "../utils";
  import {
    ChipVariant,
    ChipType,
    chipColorLookup,
    defaultTextLookup,
  } from "./constants";
  import type { ChipVariantType, ChipTsTypes } from "./constants";

  /**
   * Specify the chip variant. Primary chip should be used with primary body text, secondary with secondary text, etc.
   */
  export let variant: ChipVariantType = ChipVariant.PRIMARY;

  /**
   * Specify the chip type
   */
  export let type: ChipTsTypes = ChipType.DEFAULT;

  /**
   * Toggles disabled state of chip
   */
  export let disabled = false;

  /**
   * Used to add an icon to left side of the chip
   */
  export let icon = "";

  /**
   * Pass a funciton to call when action icon is clicked, if nothing is passed, chip will not display action icon
   */
  export let action: null | (() => void) = null;

  /**
   * Specify the content within the chip
   */
  export let content = "";

  /**
   * Specify the background-color property of the chip (ONLY applies to 'hashtag' type). Applies associated object colors to its icons and states, as well.
   */
  export let color: string | number | null = null;

  const getColor = (): string | number => {
    if (type === ChipType.HASHTAG && color) {
      return color;
    }

    return chipColorLookup[type];
  };

  let hovering = false;

  $: defaultText = defaultTextLookup[type];

  $: iconVariant =
    variant === ChipVariant.SECONDARY
      ? ChipVariant.PRIMARY
      : ChipVariant.TERTIARY;

  $: props = {
    ...$$restProps,
    class: spreadClassnames([
      "gbs-chip",
      disabled && "gbs-chip--disabled",
      variant && `gbs-chip--${variant}`,
      icon && "gbs-chip--icon",
      action && "gbs-chip--action",
      `gbs-chip--color-${getColor()}`,
      $$restProps.class,
    ]),
  };
</script>

<div
  {...props}
  on:click
  on:mouseenter={() => {
    hovering = true;
  }}
  on:mouseleave={() => {
    hovering = false;
  }}
>
  {#if icon}
    <div class="icon-container-left">
      <Icon color="--base-color-white" size={iconVariant}>{icon}</Icon>
    </div>
  {/if}
  {content || defaultText}
  {#if action}
    <button on:click|stopPropagation={action} {disabled}>
      <div class="icon-container-right">
        <Icon
          color={hovering || disabled
            ? "--base-color-white"
            : `--t-color-object-${getColor()}-secondary`}
          size={iconVariant}
        >
          cancel
        </Icon>
      </div>
    </button>
  {/if}
</div>

<style>
  .gbs-chip {
    --chip-text-color: var(--t-color-text-chip-primary);
    --chip-border-radius: 20px;
    --chip-font-size: var(--t-font-body-size-tertiary);
    --chip-line-height: var(--t-font-body-line-height-primary);
    --chip-height: 20px;
    --chip-padding: 0 var(--t-spacing-05);
  }

  .gbs-chip--secondary {
    --chip-border-radius: 13px;
    --chip-font-size: var(--t-font-body-size-primary);
    --chip-line-height: var(--t-font-body-line-height-secondary);
    --chip-height: 25px;
    --chip-padding: 0 var(--t-spacing-10);
  }

  .gbs-chip--tertiary {
    --chip-border-radius: 9px;
    --chip-font-size: var(--t-font-body-size-tertiary);
    --chip-line-height: var(--t-font-body-line-height-tertiary);
    --chip-height: 15px;
  }

  .gbs-chip--icon.gbs-chip--primary {
    --chip-border-radius: 10px;
  }

  .gbs-chip--color-1 {
    --chip-background-color: var(--t-color-object-1-primary);
  }

  .gbs-chip--color-1:hover:not(.gbs-chip--disabled) {
    --chip-background-color: var(--t-color-object-1-secondary);
  }

  .gbs-chip--color-1.gbs-chip--disabled {
    --chip-background-color: var(--t-color-object-1-tertiary);
  }

  .gbs-chip--color-2 {
    --chip-background-color: var(--t-color-object-2-primary);
  }

  .gbs-chip--color-2:hover:not(.gbs-chip--disabled) {
    --chip-background-color: var(--t-color-object-2-secondary);
  }

  .gbs-chip--color-2.gbs-chip--disabled {
    --chip-background-color: var(--t-color-object-2-tertiary);
  }

  .gbs-chip--color-3 {
    --chip-background-color: var(--t-color-object-3-primary);
  }

  .gbs-chip--color-3:hover:not(.gbs-chip--disabled) {
    --chip-background-color: var(--t-color-object-3-secondary);
  }

  .gbs-chip--color-3.gbs-chip--disabled {
    --chip-background-color: var(--t-color-object-3-tertiary);
  }

  .gbs-chip--color-4 {
    --chip-background-color: var(--t-color-object-4-primary);
  }

  .gbs-chip--color-4:hover:not(.gbs-chip--disabled) {
    --chip-background-color: var(--t-color-object-4-secondary);
  }

  .gbs-chip--color-4.gbs-chip--disabled {
    --chip-background-color: var(--t-color-object-4-tertiary);
  }

  .gbs-chip--color-5 {
    --chip-background-color: var(--t-color-object-5-primary);
  }

  .gbs-chip--color-5:hover:not(.gbs-chip--disabled) {
    --chip-background-color: var(--t-color-object-5-secondary);
  }

  .gbs-chip--color-5.gbs-chip--disabled {
    --chip-background-color: var(--t-color-object-5-tertiary);
  }

  .gbs-chip--color-6 {
    --chip-background-color: var(--t-color-object-6-primary);
  }

  .gbs-chip--color-6:hover:not(.gbs-chip--disabled) {
    --chip-background-color: var(--t-color-object-6-secondary);
  }

  .gbs-chip--color-6.gbs-chip--disabled {
    --chip-background-color: var(--t-color-object-6-tertiary);
  }

  .gbs-chip--color-7 {
    --chip-background-color: var(--t-color-object-7-primary);
  }

  .gbs-chip--color-7:hover:not(.gbs-chip--disabled) {
    --chip-background-color: var(--t-color-object-7-secondary);
  }

  .gbs-chip--color-7.gbs-chip--disabled {
    --chip-background-color: var(--t-color-object-7-tertiary);
  }

  .gbs-chip--color-8 {
    --chip-background-color: var(--t-color-object-8-primary);
  }

  .gbs-chip--color-8:hover:not(.gbs-chip--disabled) {
    --chip-background-color: var(--t-color-object-8-secondary);
  }

  .gbs-chip--color-8.gbs-chip--disabled {
    --chip-background-color: var(--t-color-object-8-tertiary);
  }

  .gbs-chip--color-9 {
    --chip-background-color: var(--t-color-object-9-primary);
  }

  .gbs-chip--color-9:hover:not(.gbs-chip--disabled) {
    --chip-background-color: var(--t-color-object-9-secondary);
  }

  .gbs-chip--color-9.gbs-chip--disabled {
    --chip-background-color: var(--t-color-object-9-tertiary);
  }

  .gbs-chip--color-10 {
    --chip-background-color: var(--t-color-object-10-primary);
  }

  .gbs-chip--color-10:hover:not(.gbs-chip--disabled) {
    --chip-background-color: var(--t-color-object-10-secondary);
  }

  .gbs-chip--color-10.gbs-chip--disabled {
    --chip-background-color: var(--t-color-object-10-tertiary);
  }

  .gbs-chip--color-11 {
    --chip-background-color: var(--t-color-object-11-primary);
  }

  .gbs-chip--color-11:hover:not(.gbs-chip--disabled) {
    --chip-background-color: var(--t-color-object-11-secondary);
  }

  .gbs-chip--color-11.gbs-chip--disabled {
    --chip-background-color: var(--t-color-object-11-tertiary);
  }

  .gbs-chip--color-12 {
    --chip-background-color: var(--t-color-object-12-primary);
  }

  .gbs-chip--color-12:hover:not(.gbs-chip--disabled) {
    --chip-background-color: var(--t-color-object-12-secondary);
  }

  .gbs-chip--color-12.gbs-chip--disabled {
    --chip-background-color: var(--t-color-object-12-tertiary);
  }

  .gbs-chip {
    display: inline-flex;

    align-items: center;
    height: var(--chip-height);
    padding: var(--chip-padding);

    color: var(--chip-text-color);
    font-size: var(--chip-font-size);
    line-height: var(--chip-line-height);
    vertical-align: bottom;

    background: var(--chip-background-color);
    border-radius: var(--chip-border-radius);
    cursor: pointer;
  }

  .gbs-chip--disabled {
    cursor: default;
  }

  .icon-container-left {
    height: 100%;
    margin-right: 2px;
  }

  .icon-container-right {
    display: inline-flex;
    align-items: center;
    height: 100%;
    margin-left: 2px;
  }

  button {
    height: 100%;
    padding: 0;

    color: var(--chip-text-color);

    background: none;

    border: none;
    cursor: pointer;
  }
</style>
