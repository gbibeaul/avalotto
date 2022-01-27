<script>
	import Title from '../components/avascratch/Title.svelte';
	import BuyTickets from '../components/avascratch/BuyTickets.svelte';
	import ScratchOff from '../components/avascratch/ScratchOff.svelte';
	import generateTickets from '../components/avascratch/generateTickets';

	let tickets = [];
	let currentTicket = {};
	let screens = ['BUY_TICKETS', 'SCRATCH_OFF', 'WINNER', 'NFT_PREVIEW'];
	let currentScreen = screens[0];
	export let showRevealYourPrizeBtn = false;

	function handleScratchNumberClick(event) {
		const numberIndex = event.detail.numberIndex;
		let { numbers } = currentTicket;
		let foundNumber = numbers[numberIndex];

		if (foundNumber) {
			foundNumber.scratched = true;
			currentTicket = currentTicket;
		}
	}

	function handleBuyTickets(event) {
		const number = event.detail.number;
		tickets = generateTickets(number);
		currentTicket = tickets[0];
		currentScreen = 'SCRATCH_OFF';
	}

	function handleRevealYourPrizeClick() {
		console.log('handleRevealYourPrizeClick');
	}

	// Disable the submit button if there are any un-scratched numbers.
	$: submitButtonDisabled = currentTicket?.numbers?.some(({ scratched }) => !scratched);
	$: showTitle = currentScreen == 'BUY_TICKETS' || currentScreen === 'SCRATCH_OFF';
	$: showBuyTickets = currentScreen == 'BUY_TICKETS';
	$: showScratchOff = currentScreen === 'SCRATCH_OFF';
	$: showWinner = currentScreen === 'WINNER';
	$: showNftPreview = currentScreen === 'NFT_PREVIEW';
</script>

<div class="flex justify-center h-full items-center">
	<div
		class="flex flex-col max-w-lg main-container bg-avascratch-background border-solid border-8 border-avascratch-border overflow-y-auto"
	>
		<img
			class="absolute mt-4 ml-1 z-10"
			src="/assets/avax_logo_grey_bg_white_color.svg"
			alt="axax_logo"
		/>

		{#if showTitle}
			<Title />
		{/if}

		{#if showBuyTickets}
			<BuyTickets on:buyTickets={handleBuyTickets} />
		{/if}

		{#if showScratchOff}
			<ScratchOff ticket={currentTicket} on:scratchNumberClicked={handleScratchNumberClick} />
		{/if}

		<div id="footer" class="flex self-center justify-self-end mt-auto mb-4">
			{#if showRevealYourPrizeBtn}
				<button
					class="border-solid rounded-md border-4 border-black py-4 px-12 z-10 disabled:opacity-30 reveal-your-prize-btn"
					type="submit"
					on:click={handleRevealYourPrizeClick}
					disabled={submitButtonDisabled}
				>
					<div class="font-bold">REVEAL YOUR PRIZE</div>
				</button>
			{/if}
		</div>
	</div>
</div>

<style>
	.main-container {
		height: 844px;
	}

	.reveal-your-prize-btn {
		background: linear-gradient(180deg, #f7da10 0%, #ffb900 100%);
	}
</style>
