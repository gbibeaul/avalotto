<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	export let currentTicketIndex = 0;
	export let numTickets = 1;

	const dispatch = createEventDispatcher();

	function handlePlayNext() {
		dispatch('playNext');
	}

	$: playText = `PLAY ${
		currentTicketIndex + 1 === numTickets ? `AGAIN` : `NEXT ${currentTicketIndex + 1}/${numTickets}`
	}`;
</script>

<div class="relative flex flex-col h-full items-center justify-center" in:fade={{ duration: 750 }}>
	<img
		src="/assets/avascratch_nft_placeholder.svg"
		alt="nft_placeholder"
		class="z-10 nft-placeholder"
	/>

	<div class="absolute bottom-0 mb-4 z-20">
		<button
			class="border-solid rounded-md border-4 border-black py-4 px-20 claim-btn"
			type="submit"
			on:click={handlePlayNext}
		>
			<div class="font-bold">{playText}</div>
		</button>
	</div>
</div>

<style>
	.nft-placeholder {
		max-width: 315px;
	}

	.claim-btn {
		background: linear-gradient(180deg, #f7da10 0%, #ffb900 100%);
	}
</style>
