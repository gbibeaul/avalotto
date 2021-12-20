<script lang="ts">
  import '../app.css';
  import Seo from "../components/Seo.svelte"
  import { stateStore } from '../stores/state'
</script>


<meta name="viewport" content="width=device-width, initial-scale=1">
<Seo />
<svelte:window on:sveltekit:start={stateStore.initialLoadMetamask} />
<slot></slot>