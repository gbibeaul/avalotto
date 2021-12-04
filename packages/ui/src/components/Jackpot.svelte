<script lang="ts">
  import { ethers } from "ethers";
  import { stateStore } from "../stores/state";

  let jackpot;

  stateStore.subscribe((value) => {
    jackpot = value.jackpot;
  });
</script>

<section>
  <!-- {ethers.utils.formatEther(jackpot)} -->
  <img class="coins" src="assets/coins.svg" alt="coins" />
  <img class="treasure" src="assets/treasure.svg" alt="a treasure chest" />
  <div class="text-container">
    <h3>Current Jackpot</h3>
    <h3>{ethers.utils.formatEther(jackpot)} AVAX!</h3>
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    margin-top: 16px;
  }

  h3 {
    background: linear-gradient(111.32deg, #f8ac38 26.41%, #e68339 96.3%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1.25rem;
  }

  .text-container {
    margin-top: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .treasure {
    margin-top: -160px;
  }

  .coins {
    margin-top: -60px;
  }
</style>
