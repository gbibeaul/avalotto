<script lang="ts">
	import '../app.css';
	import Seo from '../components/Seo.svelte';
	import { init } from '../helpers/walletHelpers'


</script>

<meta name="viewport" content="width=device-width, initial-scale=1" />
<Seo />
<svelte:window on:sveltekit:start={init} />
<slot />
