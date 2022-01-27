<script>
	import Title from '../components/avascratch/Title.svelte';
	import ScratchOff from '../components/avascratch/ScratchOff.svelte';

	let numbers = [
		{ number: 99, scratched: false },
		{ number: 66, scratched: false },
		{ number: 28, scratched: false },
		{ number: 25, scratched: false },
		{ number: 69, scratched: false },
		{ number: 42, scratched: false },
		{ number: 65, scratched: false },
		{ number: 999, scratched: false },
		{ number: 11, scratched: false }
	];
	export let showRevealYourPrizeBtn = false;

	function handleScratchNumberClick(event) {
		const numberClicked = event.detail.number;
		let foundNumber = numbers.find(({ number }) => number === numberClicked);

		if (foundNumber) {
			foundNumber.scratched = true;
			numbers = numbers;
		}
	}

	function handleRevealYourPrizeClick() {
		console.log('handleRevealYourPrizeClick');
	}

	// Disable the submit button if there are any un-scratched numbers.
	$: submitButtonDisabled = numbers.some(({ scratched }) => !scratched);
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

		<Title />

		<ScratchOff {numbers} on:scratchNumberClicked={handleScratchNumberClick} />

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
