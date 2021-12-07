<script lang="ts">
  import { spreadClassnames } from "../utils";

  export let noWrap = false;

  let restProps = {};
  let className = "";

  $: ({ class: className, ...restProps } = $$restProps);

  $: props = {
    class: spreadClassnames([
      "gbs-page-title-actions",
      noWrap && `gbs-page-title-actions--noWrap`,
      className,
    ]),
  };
</script>

<div {...props}>
  <slot />
</div>

<style>
  .gbs-page-title-actions {
    display: flex;
    margin-right: 10px;
    margin-left: 10px;
  }

  .gbs-page-title-actions > :global(.gbs-button) {
    flex-grow: 1;
  }

  .gbs-page-title-actions > :global(.gbs-button ~ .gbs-button) {
    margin-left: 5px;
  }

  @media screen and (max-width: 767px) {
    .gbs-page-title-actions:not(.gbs-page-title-actions--noWrap) {
      flex-basis: 100%;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    .gbs-page-title-actions:not(.gbs-page-title-actions--noWrap)
      ~ :global(.gbs-page-title-actions:not(.gbs-page-title-actions--noWrap)) {
      margin-top: 10px;
    }
  }
</style>
