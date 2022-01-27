<script>
	import Title from '../components/avascratch/Title.svelte';
	import BuyTickets from '../components/avascratch/BuyTickets.svelte';
	import ScratchOff from '../components/avascratch/ScratchOff.svelte';
	import Winner from '../components/avascratch/Winner.svelte';
	import ClaimNft from '../components/avascratch/ClaimNft.svelte';
	import RevealYourPrize from '../components/avascratch/RevealYourPrize.svelte';
	import generateTickets from '../components/avascratch/generateTickets';

	let tickets = [];
	let currentTicket = {};
	let screens = ['BUY_TICKETS', 'SCRATCH_OFF', 'WINNER', 'CLAIM_NFT'];
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

		const ticketFullyScratched = currentTicket.numbers.every((number) => number.scratched);
		if (ticketFullyScratched) {
			setTimeout(() => {
				currentScreen = 'WINNER';
			}, 5000);
		}
	}

	function handleBuyTickets(event) {
		const number = event.detail.number;
		tickets = generateTickets(number);
		currentTicket = tickets[0];
		currentScreen = 'SCRATCH_OFF';
	}

	function handleWinnerClaimNft() {
		currentScreen = 'CLAIM_NFT';
	}

	function handlePlayNext() {
		if (currentTicketIndex + 1 === numTickets) {
			currentScreen = 'BUY_TICKETS';
		} else {
			currentTicket = tickets[currentTicketIndex + 1];
		}
	}

	$: showTitle = currentScreen == 'BUY_TICKETS' || currentScreen === 'SCRATCH_OFF';
	$: showBuyTickets = currentScreen == 'BUY_TICKETS';
	$: showScratchOff = currentScreen === 'SCRATCH_OFF';
	$: showWinner = currentScreen === 'WINNER';
	$: claimNft = currentScreen === 'CLAIM_NFT';
	$: currentTicketIndex = tickets.findIndex((ticket) => ticket === currentTicket);
	$: numTickets = tickets.length;
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

		{#if showWinner}
			<Winner on:winnerClaimNft={handleWinnerClaimNft} />
		{/if}

		{#if claimNft}
			<ClaimNft on:playNext={handlePlayNext} />
		{/if}

		{#if showRevealYourPrizeBtn}
			<RevealYourPrize {currentTicketIndex} {numTickets} />
		{/if}
	</div>
</div>

<style>
	.main-container {
		height: 844px;
		width: 100%;
	}
</style>
