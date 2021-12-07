<script lang="ts">
  import { spreadClassnames } from "../utils";

  $: props = {
    ...$$restProps,
    class: spreadClassnames(["gbs-dialog-skrim", $$restProps.class]),
  };
</script>

<div {...props} />

<style>
  .gbs-dialog-skrim {
    position: fixed;
    top: 0;
    left: 0;

    z-index: -1;

    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    background-color: rgba(22, 22, 22, 0.25);
  }
</style>
