<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleBuyTicketsClick(number) {
		dispatch('buyTickets', {
			number
		});
	}
</script>

<div class="flex flex-col mt-24 w-full items-center">
	<button
		class="border-solid rounded-md border-4 border-black py-4 z-10 mb-3 buy-button"
		type="submit"
		on:click={() => handleBuyTicketsClick(1)}
	>
		<div class="font-bold">BUY 1 TICKET (1 AVAX)</div>
	</button>

	<button
		class="border-solid rounded-md border-4 border-black py-4 z-10 buy-button"
		type="submit"
		on:click={() => handleBuyTicketsClick(5)}
	>
		<div class="font-bold">BUY 5 TICKETS (4 AVAX)</div>
	</button>
</div>

<style>
	.buy-button {
		background: linear-gradient(180deg, #f7da10 0%, #ffb900 100%);
		width: 315px;
	}
</style>
