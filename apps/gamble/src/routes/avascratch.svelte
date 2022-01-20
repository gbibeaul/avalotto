<script>
	export let ticketPrice = 1;
	export let crypto = 'AVAX';

	function handleBuyYourTicketClick() {
		console.log('handleBuyYourTicketClick');
	}
</script>

<div class="flex justify-center align-center h-full bg-slate-300">
	<div
		class="flex flex-col bg-avascratch-background border-solid border-8 border-avascratch-border max-w-screen-sm h-full"
	>
		<div id="title-container" class="w-full mt-6">
			<img class="w-full" src="/assets/avascratch_spikeball.svg" alt="spikeball_background" />
		</div>

		<div id="main-container" class="w-full relative mt-4">
			<img class="w-full absolute" src="/assets/avascratch_sunburst_bg.svg" alt="sunburst_bg" />
			<img
				class="absolute left-1/2 avascratch-cash-sack"
				src="/assets/avascratch_cash_sack.svg"
				alt="sunburst_bg"
			/>
		</div>

		<div id="footer" class="flex self-center justify-self-end mt-auto mb-4">
			<button
				class="border-solid rounded-md border-4 border-black py-4 px-12 bg-avascratch-scratchBtn"
				on:click={handleBuyYourTicketClick}
			>
				BUY YOUR TICKET ({ticketPrice}
				{crypto})
			</button>
		</div>
	</div>
</div>

<style>
	.avascratch-cash-sack {
		transform: translate(-50%);
	}
</style>
