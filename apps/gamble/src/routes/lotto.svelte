<script lang="ts">
	import { onMount } from 'svelte';
	import Banner from '../components/lotto/Banner.svelte';
	import TicketPurchase from '../components/lotto/TicketPurchase.svelte';
	import TicketReview from '../components/lotto/TicketReview.svelte';
</script>

<div class="h-full gradient justify-content-around">
	<Banner />
	<div class="lg:flex lg:justify-between px-8">
		<TicketPurchase />
		<TicketReview />
	</div>
</div>
