<script>
	import { fade } from 'svelte/transition';

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

	function handleRevealYourPrizeClick() {
		console.log('handleRevealYourPrizeClick');
	}

	function handleScratchNumberClick(numberClicked) {
		let foundNumber = numbers.find(({ number }) => number === numberClicked);

		if (foundNumber) {
			foundNumber.scratched = true;
			numbers = numbers;
		}
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

		<div id="title-container" class="w-full relative mt-6">
			<img
				class="w-full absolute"
				src="/assets/avascratch_spikeball.svg"
				alt="spikeball_background"
			/>
			<div class="mt-8 relative flex flex-col items-center">
				<img src="/assets/avascratch_main_title.png" alt="main_title" class="main-title" />
				<div class="font-bold text-avascratch-background text-base leading-4">CURRENT JACKPOT</div>
			</div>
		</div>

		<div id="main-container" class="w-full flex-col justify-items-center relative mt-2">
			<img
				class="w-full max-w-md m-auto z-10 relative"
				src="/assets/avascratch_three_chances_to_win.png"
				alt="three_chances_to_win"
			/>
			<img
				class="w-full absolute top-0"
				src="/assets/avascratch_sunburst_bg.svg"
				alt="sunburst_bg"
			/>
			<img
				class="absolute left-1/2 avascratch-cash-sack"
				src="/assets/avascratch_cash_sack.svg"
				alt="sunburst_bg"
			/>
			<div class="relative">
				<img
					class="m-auto winning-number-bill"
					src="/assets/avascratch_winning_number_bill.png"
					alt="winning_number"
				/>
			</div>
			<div class="flex flex-row flex-wrap justify-center">
				{#each numbers as { number, scratched }, i}
					<div class="relative w-1/4 mx-2">
						<div
							class="relative flex justify-center items-center"
							class:cursor-pointer={!scratched}
							on:click|once={() => handleScratchNumberClick(number)}
						>
							<img src="/assets/avascratch_numberball.svg" alt="scratch-number" />
							{#if scratched}
								<img
									class="absolute"
									src="/assets/avascratch_scratch_grey_area.svg"
									alt="scratch_grey_area"
									transition:fade={{ duration: 750 }}
								/>
								<div
									class="absolute flex justify-center font-['Bangers'] text-5xl scratch-number-balls-text"
									transition:fade={{ delay: 200, duration: 750 }}
								>
									{number}
								</div>
							{:else}
								<div class="absolute ml-1 mb-1">
									<img src="/assets/avascratch_coins_red.svg" alt="red_coins" />
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
			<div
				class="relative text-center text-xl font-bold font-['Proxima-Nova'] -top-1 match-three-numbers"
			>
				Match three numbers to win!
			</div>
		</div>

		<div id="footer" class="flex self-center justify-self-end mt-auto mb-4">
			<button
				class="border-solid rounded-md border-4 border-black py-4 px-12 z-10 disabled:opacity-30 reveal-your-prize-btn"
				type="submit"
				on:click={handleRevealYourPrizeClick}
				disabled={submitButtonDisabled}
			>
				<div class="font-bold">REVEAL YOUR PRIZE</div>
			</button>
		</div>
	</div>
</div>

<style>
	@font-face {
		font-family: 'Bangers';
		font-style: normal;
		font-weight: 400;
		src: url(/assets/Bangers-Regular.ttf) format('truetype');
	}

	@font-face {
		font-family: 'Proxima-Nova';
		font-style: normal;
		font-weight: 400;
		src: url(/assets/Proxima-Nova.otf) format('opentype');
	}

	.avascratch-cash-sack {
		transform: translate(-50%);
		max-height: 428px;
	}

	.scratch-number-balls-text {
		-webkit-text-stroke: 2px #e1e0e1;
	}

	.main-container {
		height: 844px;
	}

	.main-title {
		max-width: 85%;
	}

	.winning-number-bill {
		max-width: 278px;
	}

	.match-three-numbers {
		color: #d6ddd5;
		text-shadow: -1px 1px 2px #000, 1px 1px 2px #000, 1px -1px 0 #000, -1px -1px 0 #000;
	}

	.reveal-your-prize-btn {
		background: linear-gradient(180deg, #f7da10 0%, #ffb900 100%);
	}
</style>
