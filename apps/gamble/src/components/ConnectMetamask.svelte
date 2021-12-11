<script lang="ts">
  import { Button } from "smelte";
  import { stateStore } from "../stores/state";

  let ethereumDetected;

  stateStore.subscribe((value) => {
    ethereumDetected = value.ethereumDetected;
  });
</script>

<section>
  {#if ethereumDetected}
    <div class="py-2">
      <Button
        color="secondary"
        on:click={stateStore.connectMetamask}
        light
        block
        outlined>Connect Metamask</Button
      >
    </div>
  {:else}
    <div class="py-2">
      <Button
        color="secondary"
        on:click={stateStore.downloadMetamask}
        light
        block
        outlined>Install Metamask</Button
      >
    </div>
  {/if}
</section>

<style>
  section {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
</style>
