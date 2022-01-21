<script>
	export let ticketPrice = 1;
	export let currency = 'AVAX';
	export let currentJackpot = '5,000';
	export let numChancesToWin = 3;
	let numScratchColumns = 3;
	let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	function handleBuyYourTicketClick() {
		console.log('handleBuyYourTicketClick');
	}
</script>

<div class="flex justify-center align-center h-full bg-slate-300">
	<div
		class="flex flex-col bg-avascratch-background border-solid border-8 border-avascratch-border max-w-screen-sm h-full overflow-y-auto"
	>
		<img
			class="absolute mt-1 ml-1 z-10"
			src="/assets/avax_logo_grey_bg_white_color.svg"
			alt="axax_logo"
		/>

		<div id="title-container" class="align-center w-full relative mt-6">
			<img
				class="w-full absolute"
				src="/assets/avascratch_spikeball.svg"
				alt="spikeball_background"
			/>
			<div class="mt-8 relative flex flex-col items-center">
				<div>AVASCRATCH</div>
				<div>{currentJackpot} {currency}</div>
				<div>CURRENT JACKPOT</div>
			</div>
		</div>

		<div id="main-container" class="w-full flex-col justify-items-center relative mt-4">
			<div class="flex flex-col items-center">{numChancesToWin} CHANCES TO WIN!</div>
			<div class="relative">
				<img
					class="w-3/4 m-auto"
					src="/assets/avascratch_winning_number_bill.png"
					alt="winning_number"
				/>
			</div>
			<img class="w-full absolute" src="/assets/avascratch_sunburst_bg.svg" alt="sunburst_bg" />
			<img
				class="absolute left-1/2 avascratch-cash-sack"
				src="/assets/avascratch_cash_sack.svg"
				alt="sunburst_bg"
			/>
			<div class="flex flex-row flex-wrap justify-center">
				{#each numbers as number, i}
					<div class="relative w-1/4 mx-2">
						<img class="relative" src="/assets/avascratch_numberball.svg" alt="scratch-number" />
						<div class="absolute left-0 text-center top-1/3 w-full">99</div>
					</div>
				{/each}
			</div>
		</div>

		<div id="footer" class="flex self-center justify-self-end mt-auto mb-4">
			<button
				class="border-solid rounded-md border-4 border-black py-4 px-12 bg-avascratch-scratchBtn"
				on:click={handleBuyYourTicketClick}
			>
				BUY YOUR TICKET ({ticketPrice}
				{currency})
			</button>
		</div>
	</div>
</div>

<style>
	.avascratch-cash-sack {
		transform: translate(-50%);
	}
</style>
