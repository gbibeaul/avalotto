<script lang="ts">
  import { spreadClassnames } from "../utils";

  let restProps = {};
  let className = "";

  $: ({ class: className, ...restProps } = $$restProps);

  $: props = {
    class: spreadClassnames(["gbs-page-title", className]),
  };
</script>

<header {...props}>
  <slot />
</header>

<style>
  * {
    box-sizing: border-box;
  }

  .gbs-page-title {
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    min-height: 70px;

    padding: 10px;

    background-color: var(--t-color-background-page-title);
    border-bottom: 1px solid var(--t-color-border-page-title);
  }

  @media screen and (max-width: 767px) {
    .gbs-page-title {
      flex-wrap: wrap;
    }

    .gbs-page-title > :global(.gbs-page-title-icon) {
      display: none;
    }
  }
</style>
