<script lang="ts">
  import { ethers } from "ethers";
  import ConnectMetamask from "./components/ConnectMetamask.svelte";
  import Buy from "./components/Buy.svelte";
  import Jackpot from "./components/Jackpot.svelte";
  import "smelte/src/tailwind.css";

  import { stateStore } from "./stores/state";
  import { routing, Routes } from "./stores/routing";
  import TicketList from "./components/TicketList.svelte";

  let userAddress;
  let bets;
  let route;

  stateStore.subscribe((value) => {
    userAddress = value.userAddress;
    bets = value.bets;
  });

  routing.subscribe((value) => {
    route = value;
  });
</script>

<main>
  <Jackpot />
  {#if route === Routes.noAccount}
    <ConnectMetamask />
  {/if}
  {#if route === Routes.buying}
    <Buy />
  {/if}
  {#if route === Routes.hasBet}
    <TicketList />
  {/if}
</main>

<style>
  :global(*) {
    margin: 0;
    padding: 0;
  }

  :global(html) {
    font-family: Mukta Mahee;
    height: 100%;
    min-height: 100px;
  }
  :global(body) {
    display: flex;
    flex-direction: column;
    padding: 0;
    color: white;
    align-items: center;
    justify-content: center;
    margin: 0;
    background: linear-gradient(141.19deg, #570dc8 -0.01%, #9e4efc 91.28%);
    height: 100%;
    min-height: 100px;
    overflow: hidden;
  }

  main {
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    height: 650px;
    max-width: 320px;
    width: 100%;
  }
</style>
