<script lang="ts">
  import { ethers } from "ethers";
  import { Button, Snackbar } from "smelte";
  import FaDice from "svelte-icons/fa/FaDice.svelte";

  import { stateStore } from "../stores/state";
  import Input from "./Input.svelte";
  import { randomDigit } from "../helpers/display.helpers";

  const areNumvalids = (num) => {
    return Number(num) < 0 || Number(num) > 99;
  };

  let num1 = String(randomDigit());
  let num2 = String(randomDigit());
  let num3 = String(randomDigit());
  let showError = false;
  let error = "";

  const handleSubmit = () => {
    if (num1 === num2 || num1 === num3 || num2 === num3) {
      showError = true;
      error = "Numbers must be unique";
      return;
    }

    if (areNumvalids(num1) || areNumvalids(num2) || areNumvalids(num3)) {
      showError = true;
      error = "Numbers must be between 0 and 99";
      return;
    }

    const numbers = [num1, num2, num3].map(ethers.BigNumber.from);

    stateStore.placeBet(numbers);
  };

  const handleGetRandomNumbers = () => {
    num1 = String(randomDigit());
    num2 = String(randomDigit());
    num3 = String(randomDigit());
  };
</script>

<section>
  <h3>Select different digits from 0 to 99</h3>
</section>
<section>
  <div class="num1"><Input bind:value={num1} /></div>
  <div class="num2"><Input bind:value={num2} /></div>
  <div class="num3"><Input bind:value={num3} /></div>
  <div class="icon" on:click={handleGetRandomNumbers}>
    <FaDice />
  </div>
</section>

<section>
  <Button color="secondary" on:click={handleSubmit} light block outlined
    >Buy your ticket (1 AVAX)</Button
  >
</section>

<Snackbar noAction bottom timeout={3000} bind:value={showError}>
  <h3>{error}</h3>
</Snackbar>

<style>
  section {
    display: flex;
    align-items: center;
    padding: 10px;
  }

  .num1 {
    margin-right: 10px;
  }

  .num2 {
    margin-right: 10px;
  }

  .num3 {
    margin-right: 10px;
  }

  h3 {
    background: linear-gradient(111.32deg, #f8ac38 26.41%, #e68339 96.3%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1.25rem;
  }

  .icon {
    color: #e68339;
    width: 100px;
    cursor: pointer;
  }
</style>
