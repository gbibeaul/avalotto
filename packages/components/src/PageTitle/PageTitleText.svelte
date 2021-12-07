<script lang="ts">
  import { spreadClassnames } from "../utils";

  let restProps = {};
  let className = "";

  $: ({ class: className, ...restProps } = $$restProps);

  $: props = {
    class: spreadClassnames(["gbs-page-title-text", className]),
  };
</script>

<div {...props}>
  <h3 class="gbs-page-title-text-main truncate">
    <slot />
  </h3>
  <div class="gbs-page-title-text-subtitle truncate">
    <slot name="subtitle" />
  </div>
</div>

<style>
  .gbs-page-title-text {
    flex: 1 0 0%;
    margin-right: 10px;
    margin-left: 10px;
    overflow: hidden;
  }

  .gbs-page-title-text-main {
    margin: 0;
  }

  .gbs-page-title-text-subtitle {
    margin: 0;
  }

  .truncate {
    overflow: hidden;

    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
