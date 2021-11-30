<script>
  export let buttonTitle = "";
  let active = false;

  const handleToggle = () => {
    active = !active;
  };
</script>

<button class="collapsible" on:click={handleToggle} type="button"
  >{buttonTitle}</button
>
<section class="content" class:active>
  <slot />
</section>

<style>
  .collapsible {
    background: rgba(144, 19, 254, 0.6);
    color: #ff39dc;
    background-blend-mode: lighten;
    cursor: pointer;
    padding: 18px;
    font-weight: 500;
    font-size: 14px;
    line-height: 23px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 15px;
  }
  .content {
    padding: 0 18px;
    display: none;
    overflow: hidden;
  }

  .active {
    display: inherit;
  }
</style>
