<script>
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	export let ticket = { numbers: [] };
	const dispatch = createEventDispatcher();

	function handleScratchNumberClick(number) {
		dispatch('scratchNumberClicked', {
			number
		});
	}
</script>

<div id="scratch-off" class="w-full flex-col justify-items-center relative -mt-1">
	<img
		class="w-full absolute sunburst-bg"
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
		{#each ticket.numbers as { number, scratched }, i}
			<div class="relative w-1/4 mx-2">
				<div
					class="relative flex justify-center items-center"
					class:cursor-pointer={!scratched}
					on:click={() => handleScratchNumberClick(number)}
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

	.winning-number-bill {
		max-width: 278px;
	}

	.match-three-numbers {
		color: #d6ddd5;
		text-shadow: -1px 1px 2px #000, 1px 1px 2px #000, 1px -1px 0 #000, -1px -1px 0 #000;
	}

	.sunburst-bg {
		top: -76px;
	}
</style>
