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
				nextScreen();
			}, 5000);
		}
	}

	function handleBuyTickets(event) {
		const number = event.detail.number;
		tickets = generateTickets(number);
		currentTicket = tickets[0];
		nextScreen();
	}

	function handleWinnerClaimNft() {
		nextScreen();
	}

	function handlePlayNext() {
		if (currentTicketIndex + 1 === numTickets) {
			nextScreen();
		} else {
			currentTicket = tickets[currentTicketIndex + 1];
			const scratchOffScreenIndex = screens.findIndex((screen) => screen === 'SCRATCH_OFF');
			currentScreen = screens[scratchOffScreenIndex];
		}
	}

	function nextScreen() {
		if (currentScreenIndex < numScreens - 1) {
			currentScreen = screens[currentScreenIndex + 1];
			return;
		}

		currentScreen = screens[0];
	}

	$: showTitle = currentScreen == 'BUY_TICKETS' || currentScreen === 'SCRATCH_OFF';
	$: showBuyTickets = currentScreen == 'BUY_TICKETS';
	$: showScratchOff = currentScreen === 'SCRATCH_OFF';
	$: showWinner = currentScreen === 'WINNER';
	$: claimNft = currentScreen === 'CLAIM_NFT';
	$: currentTicketIndex = tickets.findIndex((ticket) => ticket === currentTicket);
	$: numTickets = tickets.length;
	$: currentScreenIndex = screens.findIndex((screen) => screen === currentScreen);
	$: numScreens = screens.length;
</script>

<div class="flex justify-center h-screen items-center page-container">
	<div
		class="flex flex-col max-w-lg main-container bg-avascratch-background border-solid border-8 border-avascratch-border overflow-y-auto"
	>
		<div class="relative">
			<img
				class="absolute mt-2 ml-1 z-10"
				src="/assets/avax_logo_grey_bg_white_color.svg"
				alt="axax_logo"
			/>
			<a href="/" class="absolute top-2 right-2 z-10">
				<img src="/assets/avascratch/go-to-home-icon.svg" alt="go_to_home_logo" />
			</a>
		</div>

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
			<ClaimNft {currentTicketIndex} {numTickets} on:playNext={handlePlayNext} />
		{/if}

		{#if showRevealYourPrizeBtn}
			<RevealYourPrize />
		{/if}
	</div>
</div>

<style>
	.main-container {
		height: 844px;
		width: 100%;
	}

	.page-container {
		background: linear-gradient(112.41deg, #d81414 0.38%, #32148a 52.78%, #a5820a 100%);
	}
</style>
