<script type="ts">
  import { getContext } from "svelte";
  import { spreadClassnames } from "../../utils";
  import { TERROIR_TAB_CONTEXT } from "../constants";
  import Icon from "../../Icon/Icon.svelte";

  /**
   * Sets the disabled property of the MenuItem
   */
  export let disabled = false;

  /**
   * Specify the leading icon show before the MenuItem value
   */
  export let icon = "";

  let tabEl: HTMLElement = null;

  const tabId = Math.random().toString(36);

  const { registerTab, selectedIndex, selectTab, longestTab, tabs, fullWidth } =
    getContext(TERROIR_TAB_CONTEXT) || {};

  $: if (registerTab && tabEl && longestTab) {
    const { width } = tabEl.getBoundingClientRect();
    registerTab(tabId);
    longestTab.update((currLength: number) =>
      width > currLength ? width : currLength
    );
  }

  $: isSelected = tabs && selectedIndex && $tabs[$selectedIndex] === tabId;

  $: cssVarStyles = `--tab-width:${$longestTab}px;`;

  $: props = {
    ...$$restProps,
    class: spreadClassnames([
      "gbs-tab",
      "gbs-body-primary",
      isSelected && "gbs-tab--active",
      fullWidth && "gbs-tab--full-width",
      disabled && "disabled",
      $$restProps.class,
    ]),
    style: cssVarStyles,
  };
</script>

<button
  role="tab"
  aria-disabled={disabled}
  class:disabled
  bind:this={tabEl}
  aria-selected={isSelected}
  on:click={selectTab && !disabled && (() => selectTab(tabId))}
  on:click
  {...props}
>
  {#if icon}
    <Icon class="gbs-tab-icon">{icon}</Icon>
  {/if}
  <slot />
</button>

<style>
  .gbs-tab--active {
    position: relative;
  }

  .gbs-tab {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    max-width: 300px;
    height: 35px;
    padding: 0 20px;

    color: var(--t-color-text-tab-unselected);

    background-color: var(--t-color-background-tab-unselected, transparent);
    border: none;

    border-color: var(--t-color-border-tab-unselected);
    border-style: solid;
    border-width: var(--t-border-width-tab, 0);
    border-top-left-radius: var(--t-radius-select);
    border-top-right-radius: var(--t-radius-select);
    cursor: pointer;
  }

  .gbs-tab:not(.gbs-tab--full-width) {
    width: var(--tab-width);
  }

  .gbs-tab--full-width {
    flex: 1;
  }

  .gbs-tab--active {
    color: var(--t-color-text-tab-selected);

    background-color: var(--t-color-background-tab-selected);
  }

  .gbs-tab:hover:not(.gbs-tab--active):not(.disabled) {
    color: var(--t-color-text-tab-hover);

    background-color: var(--t-color-background-tab-hover);
  }

  .gbs-tab :global(.gbs-tab-icon) {
    padding-right: 5px;

    color: var(--t-color-text-tab-unselected);
  }
  .gbs-tab--active :global(.gbs-tab-icon) {
    color: var(--t-color-text-tab-selected);
  }

  .gbs-tab.disabled :global(.gbs-tab-icon) {
    color: var(--t-color-text-tab-disabled);
  }

  .gbs-tab:hover:not(.gbs-tab--active):not(.disabled) :global(.gbs-tab-icon) {
    color: var(--t-color-text-tab-hover);
  }

  .disabled {
    color: var(--t-color-text-tab-disabled);

    border-color: var(--t-color-border-tab-disabled);
    cursor: default;
  }
</style>
