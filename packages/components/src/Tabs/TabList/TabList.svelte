<script type="ts">
  import { getContext } from "svelte";
  import { spreadClassnames } from "../../utils";
  import { TERROIR_TAB_CONTEXT } from "../constants";

  const { selectedIndex, longestTab, fullWidth, tabs } =
    getContext(TERROIR_TAB_CONTEXT) || {};
  const { currentTheme } = getContext("theme");
  let tabElWidth: number;

  let underlineOffset = 0;
  let underlineWidth = "";
  // Measurements for determining selected underline width and offset based on wither
  // tabs are fixed width or change to
  $: if (fullWidth) {
    const widthPercent = 100 / $tabs.length;
    underlineOffset =
      tabElWidth && ((widthPercent * $selectedIndex) / 100) * tabElWidth;
    underlineWidth = `${widthPercent}%`;
  } else {
    underlineOffset = $longestTab && $longestTab * $selectedIndex;
    underlineWidth = `${$currentTheme !== "gb-classic" ? $longestTab : 0}px`;
  }

  $: cssVarStyles = `
        --underline-width:${underlineWidth};
        --underline-left:${underlineOffset}px;
    `;

  $: props = {
    ...$$restProps,
    class: spreadClassnames([
      "gbs-tab-list",
      fullWidth && "gbs-tab-list--full-width",
      $$restProps.class,
    ]),
    style: cssVarStyles,
  };
</script>

<div {...props} bind:clientWidth={tabElWidth}>
  <slot />
  <div class="selected-underline" />
</div>

<style>
  .gbs-tab-list {
    position: relative;

    display: flex;

    border-color: var(--t-color-border-tab-unselected);
    border-style: solid;

    border-width: 0 0 1px 0;
  }

  .gbs-tab-list :global(button:not(:last-of-type)) {
    margin-right: var(--t-margin-width-tab, 0);
  }

  .selected-underline {
    position: absolute;
    bottom: -1px;

    width: var(--underline-width);
    height: 2px;

    background: var(--t-color-border-tab-selected);
    transform: translateX(var(--underline-left));

    transition: transform 0.3s ease-in-out;
  }

  .gbs-tab-list--full-width :global(.gbs-tab) {
    max-width: none;
  }
</style>
