<script lang="ts">
  import '../app.css';
  import Seo from "../components/Seo.svelte"
  import { walletStore } from '../stores/wallet'
</script>


<meta name="viewport" content="width=device-width, initial-scale=1">
<Seo />
<svelte:window on:sveltekit:start={walletStore.init} />
<slot></slot>