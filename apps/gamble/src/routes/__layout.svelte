<script lang="ts">
  import '../app.css';
  import Seo from "../components/Seo.svelte"
  import { stateStore } from '../stores/state'
</script>

<Seo />
<svelte:window on:sveltekit:start={stateStore.initialLoadMetamask} />
<slot></slot>