<script lang="ts">
	import Banner from '../components/lotto/Banner.svelte';
	import TicketPurchase from '../components/lotto/TicketPurchase.svelte';
	import TicketReview from '../components/lotto/TicketReview.svelte';
	import { lottoStore } from '../stores/lotto';
	import { stateStore } from '../stores/state'

	stateStore.subscribe(() => {})
</script>

<div class="h-full gradient justify-content-around">
	<Banner />
	<TicketPurchase />
	<TicketReview />
</div>

