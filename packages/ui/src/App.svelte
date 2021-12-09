<script lang="ts">
  import ConnectMetamask from "./components/ConnectMetamask.svelte";
  import Buy from "./components/Buy.svelte";
  import Jackpot from "./components/Jackpot.svelte";
  import "smelte/src/tailwind.css";

  import { stateStore } from "./stores/state";
  import { routing, Routes } from "./stores/routing";
  import TicketList from "./components/TicketList.svelte";
  import Header from "./components/Header.svelte";
  import Layout from "./components/Layout.svelte";

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

<Layout />

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
