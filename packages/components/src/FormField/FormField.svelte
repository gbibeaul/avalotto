<script lang="ts">
  import { spreadClassnames } from "../utils";

  /**
   * Specify the label placement in regards to the control. Defaults to right
   */
  export let labelPlacement: "right" | "left" = "right";

  /**
   * Specify the whether the label should have disabled style (should be used with a disabled control only)
   */
  export let disabled = false;

  $: props = {
    ...$$restProps,
    class: spreadClassnames([
      "gbs-form-field",
      disabled && "gbs-form-field--disabled",
      labelPlacement && `gbs-form-field--label-${labelPlacement}`,
      $$restProps.class,
    ]),
  };
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label {...props}>
  <slot />
  <slot name="label" />
</label>

<style>
  .gbs-form-field {
    display: flex;

    cursor: pointer;
  }

  .gbs-form-field--label-left {
    flex-flow: row-reverse;
    justify-content: space-between;
  }

  .gbs-form-field--disabled {
    color: var(--t-color-text-disabled);

    cursor: default;
  }
</style>
