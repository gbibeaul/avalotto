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
    console.log("setting seed");
    console.log(userAddress);
    const hashedSeed = ethers.utils.id(seed);
    await stateStore.setSeed(hashedSeed);
  };

  const handleReveal = (e) => {
    e.preventDefault();
    console.log("reveal seed");
    console.log(userAddress);
    const hashedSeed = ethers.utils.id(seed);
    stateStore.reveal(hashedSeed);
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
