<script lang="ts">
  import { spreadClassnames, useActions } from "../utils";
  import type { UseActions } from "../utils";

  /**
   * Specifies the checked state of the checkbox
   */
  export let checked = false;

  /**
   * Specify value of the checkbox input
   */
  export let value: string | number = "";

  /**
   * Specify the group binding if checkbox is part of a group
   */
  export let group: Array<string | number> = [];

  /**
   * Specifies whether the state of the checkbox should be indeterminate
   */
  export let indeterminate = false;

  /**
   * You can add actions to the components with use={[Action1, [Action2, action2Props], Action3]}.
   */
  export let use: UseActions = [];

  let prevChecked: boolean;
  let prevGroup: Array<string | number>;

  $: if (value) {
    const index = group.indexOf(value);
    if (checked !== prevChecked && typeof prevChecked === "boolean") {
      if (checked && index === -1) {
        group.push(value);
      } else if (!checked && index !== -1) {
        group.splice(index, 1);
      }
      prevChecked = checked;
    } else if (group !== prevGroup) {
      if (index === -1) {
        checked = false;
        prevChecked = checked;
      } else if (index !== -1) {
        checked = true;
        prevChecked = checked;
      }
      prevGroup = group;
    }
  }

  let restProps = {};
  let className = "";

  $: ({ class: className, ...restProps } = $$restProps);

  $: props = {
    class: spreadClassnames(["gbs-checkbox", className]),
  };
</script>

<span {...props}>
  <input
    type="checkbox"
    bind:checked
    bind:indeterminate
    use:useActions={use}
    aria-checked={checked}
    on:change|capture
    {...restProps}
  />
  <span class="custom-checkbox" />
</span>

<style>
  .custom-checkbox {
    --checkbox-border-color: var(--t-color-text-primary);
    --checkbox-background-color: none;
    --checkbox-border: 2px solid;
  }

  input:disabled {
    cursor: default;
  }
  input:hover ~ .custom-checkbox {
    --checkbox-border-color: var(--t-color-text-secondary);
  }

  input:disabled ~ .custom-checkbox {
    --checkbox-border-color: var(--t-color-text-disabled);
  }
  input:checked ~ .custom-checkbox {
    --checkbox-background-color: var(--t-color-background-control-active);
    --checkbox-border: hidden;
  }
  input:checked:disabled ~ .custom-checkbox {
    --checkbox-background-color: var(--t-color-text-disabled);
    --checkbox-border: hidden;
  }

  input:checked:hover:not(:disabled) ~ .custom-checkbox {
    --checkbox-background-color: var(--t-color-background-control-active-hover);
  }

  input:indeterminate ~ .custom-checkbox {
    --checkbox-background-color: var(--t-color-background-control-active);
    --checkbox-border: hidden;
  }

  input:indeterminate:disabled ~ .custom-checkbox {
    --checkbox-background-color: var(--t-color-text-disabled);
    --checkbox-border: hidden;
  }

  input:indeterminate:hover:not(:disabled) ~ .custom-checkbox {
    --checkbox-background-color: var(--t-color-background-control-active-hover);
  }

  input:not(:indeterminate) ~ .custom-checkbox:after {
    position: absolute;
    top: 10px;
    left: 3px;

    display: none;

    border-bottom: 2px solid var(--t-color-background-primary);
    border-left: 2px solid var(--t-color-background-primary);
    transform: rotate(-45deg);
    transform-origin: top left;

    content: "";
  }

  input:indeterminate ~ .custom-checkbox:after {
    position: absolute;
    top: 9px;
    left: 5px;

    display: block;
    width: 10px;

    border-bottom: 2px solid var(--t-color-background-primary);
    border-left: 2px solid var(--t-color-background-primary);

    content: "";
  }

  input:checked ~ .custom-checkbox:after {
    display: block;

    animation: check 150ms cubic-bezier(0.4, 0, 0.23, 1) both;
  }
  .gbs-checkbox {
    position: relative;

    flex-shrink: 0;

    align-items: flex-end;
    width: 20px;

    height: 20px;
    margin-right: var(--t-spacing-05);
  }
  .custom-checkbox {
    position: absolute;
    top: 0;
    left: 0;

    width: 20px;
    height: 20px;

    background-color: var(--checkbox-background-color);

    border: var(--checkbox-border);
    border-color: var(--checkbox-border-color);
  }

  input {
    position: absolute;
    top: 0;
    z-index: 1;

    width: 20px;
    height: 20px;
    margin: 0;

    cursor: pointer;
    opacity: 0;
  }

  @keyframes check {
    0% {
      width: 0;
      height: 0;
    }

    50% {
      width: 0;
      height: 5px;
    }
    100% {
      width: 13px;
      height: 7px;
    }
  }
</style>
