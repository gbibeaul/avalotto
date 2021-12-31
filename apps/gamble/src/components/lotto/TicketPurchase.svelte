<script lang="ts">
	import { BigNumber, utils } from 'ethers';
	import Play from './Play.svelte';
	import { lottoStore, LottoSteps } from '../../stores/lotto';

	let currentStep: LottoSteps;
	let jackpot: BigNumber;
	let plays = $lottoStore.plays;

	lottoStore.subscribe((value) => {
		currentStep = value.currentStep;
		jackpot = value.jackpot;
	});

	const getRandom = () => Math.floor(Math.random() * 100);

	const handleAddPlay = () => {
		plays = [...plays, [getRandom(), getRandom(), getRandom()]];
	};

	const handleRemovePLay = (index) => {
		plays = plays.filter((_, i) => index !== i);
	};

	$: {
		lottoStore.setPlays(plays);
	}
</script>

<div class="justify-center flex lg:w-4/6" class:hide={currentStep === LottoSteps.REVIEW_TICKET}>
	<main class="w-11/12 bg-white mt-4 rounded-md overflow-y-scroll mb-36">
		<hgroup
			class="h-48 flex flex-col justify-center py-6 border-b-2 shadow-[0_15px_10px_-15px_#111] "
		>
			<strong class="font-bold flex justify-center text-sm uppercase"
				>The current jackpot (FUJI TEST) is</strong
			>
			<em class="flex justify-center font-italic text-6xl">{utils.formatEther(jackpot)} AVAX </em>
		</hgroup>
		{#if currentStep === LottoSteps.SELECT_PLAYS}
			<section class="bg-white flex justify-center flex-col  px-8">
				{#each plays as [num1, num2, num3], i}
					<Play
						removePlay={() => handleRemovePLay(i)}
						playNo={i + 1}
						bind:num1
						bind:num2
						bind:num3
						isFirst={i === 0}
					/>
				{/each}
			</section>
			<section class="flex justify-center py-4">
				<button
					on:click={handleAddPlay}
					class="w-40 bg-avaloto rounded text-indigo-500 border-indigo-500 border-2 h-16"
				>
					Add a play
				</button>
			</section>
		{/if}
		{#if currentStep === LottoSteps.CONFIRMING}
			<section class="h-64 flex flex-col justify-center py-8">
				<strong class="font-bold flex justify-center text-sm">Confirming...</strong>
			</section>
		{/if}
		{#if currentStep === LottoSteps.CONFIRMED}
			<section class="h-64 flex flex-col justify-center py-8">
				<strong class="font-bold flex justify-center text-sm">Ticket purchase confirmed</strong>
				<span class="flex justify-center text-sm">
					<div><b>Tx ID: </b> {$lottoStore.txHash}</div>
				</span>
				<em class="flex font-bold justify-center text-6xl text-indigo-500">GOOD LUCK!</em>
				<em class="flex font-bold justify-center text-6xl text-indigo-500">🤞</em>
			</section>
			<section class="flex justify-center py-4">
				<!-- TODO: on:click={handlePlayAgain} -->
				<button class="w-40 bg-avaloto rounded text-indigo-500 border-indigo-500 border-2 h-16">
					Play again
				</button>
			</section>
		{/if}
	</main>
</div>
{#if currentStep === LottoSteps.SELECT_PLAYS}
	<footer
		class="fixed left-0 bottom-0 w-full bg-white h-28 place-content-center flex p-6 lg:invisible shadow-[0_0px_4px_21px_rgba(0,0,0,0.2)]"
	>
		<button
			on:click={() => lottoStore.setStep(LottoSteps.REVIEW_TICKET)}
			class="bg-avaloto w-72 bg-indigo-500 text-white rounded">Review Transaction</button
		>
	</footer>
{/if}

<style>
	@media only screen and (max-width: 1024px) {
		.hide {
			display: none;
		}
	}
</style>
