<script>
  // libs
  import { onMount } from "svelte";
  import MetaMaskOnboarding from "@metamask/onboarding";
  import detectEthereumProvider from "@metamask/detect-provider";
  // data
  import { wallet } from "./stores/wallet.store";
  // local
  import { getShortenedAddress } from "./helpers/display.helpers";
  import CollapsibleMenu from "./components/CollapsibleMenu.svelte";

  let onboarding = new MetaMaskOnboarding();
  let loading = true;

  function handleOnboarding() {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(wallet.handleAccountChange);
    } else {
      onboarding.startOnboarding();
    }
  }

  async function listenToMetamask() {
    const ethereum = await detectEthereumProvider();
    const address = await ethereum.request({ method: "eth_requestAccounts" });
    wallet.handleAccountChange(address);
    ethereum.on("accountsChanged", wallet.handleAccountChange);
    loading = false;
  }

  onMount(listenToMetamask);
</script>

<main>
  <CollapsibleMenu buttonTitle="User">
    {#if !$wallet.length && !loading}
      <button on:click={handleOnboarding}>click me</button>
    {:else}
      <h5>{getShortenedAddress($wallet)}</h5>
    {/if}
  </CollapsibleMenu>
</main>

<!-- font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 23px;
letter-spacing: 0em;
text-align: left; -->
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
    background: rgba(144, 19, 254, 0.6);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    height: 600px;
    max-width: 320px;
    width: 100%;
  }
</style>
