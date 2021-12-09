<script lang="ts">
  import { ethers } from "ethers";

  import { stateStore } from "./store/state";
  let seed = "";

  let userAddress;
  let jackpot;
  stateStore.subscribe((val) => {
    userAddress = val.userAddress;
    jackpot = val.jackpot;
  });

  const handleSubmitSeed = async (e) => {
    e.preventDefault();
    await stateStore.setSeed(seed);
  };

  const handleReveal = (e) => {
    e.preventDefault();
    stateStore.reveal(seed);
  };
</script>

<main>
  <form on:submit={handleSubmitSeed}>
    <input bind:value={seed} id="seed" type="text" />
    <button type="submit">Submit seed</button>
  </form>
  <form on:submit={handleReveal}>
    <button type="submit">reveal</button>
  </form>
</main>
