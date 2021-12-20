<script lang="ts">
	import { BigNumber, utils } from 'ethers';
	import FaLongArrowAltLeft from 'svelte-icons/fa/FaLongArrowAltLeft.svelte';
	import { format } from 'date-fns';
	import { lottoStore, LottoSteps } from '../../stores/lotto';

	let currentStep: LottoSteps;
	let jackpot: BigNumber;
	let plays: number[][];

	lottoStore.subscribe((value) => {
		currentStep = value.currentStep;
		plays = value.plays;
		jackpot = value.jackpot;
	});

	const formatNumber = (num: number): string => {
		if (num < 10) {
			return `0${num}`;
		}
		return String(num);
	};

	const handleBuy = () => {
		lottoStore.placeBet(plays)
	}
</script>

<!-- outer component with gradient bg -->
<div class="justify-center flex  max-w-xl" class:hide={currentStep === LottoSteps.SELECT_PLAYS}>
	<!-- white card -->
	<main class=" w-11/12 bg-white mt-12 rounded-md overflow-y-scroll mb-36 flex flex-row">
		<!-- left portion of card -->
		<div class="w-5/6 p-6 flex flex-col">
			<!-- row with back arrow and inted -->
			<div class="flex justify-between mb-8">
				<button class="h-10 w-8"><FaLongArrowAltLeft /></button>
				<span
					class="w-5/6 border-solid border-2 border-black flex justify-center items-center font uppercase"
					>ticket Not yet minted</span
				>
			</div>

			<!-- row with ava logo date and price -->
			<div class="flex justify-between mb-8 items-center">
				<img
					class="h-12 sm:h-20"
					src="/assets/Avax_logo_large.svg"
					alt="avalanche blockchain network logo"
				/>
				<div class="space-y-2 flex flex-col">
					<time class="font-bold uppercase text-lg flex justify-end"
						>{format(new Date(), 'dd-MMM-yyyy')}</time
					>
					<span class="font-bold uppercase sm:text-5xl text-4xl">{utils.formatEther(jackpot)} AVAX</span>
				</div>
			</div>

			<!-- row numbers played -->
			<div class="flex justify-center mb-6">
				<div>
					<div class="uppercase font-semibold text-lg">numbers played</div>
					{#each plays as play}
						<div class="text-2xl flex justify-around">
							<span>{formatNumber(play[0])}</span>
							<span>{formatNumber(play[1])}</span>
							<span>{formatNumber(play[2])}</span>
						</div>
					{/each}
				</div>
			</div>

			<div class="flex justify-center uppercase font-semibold text-lg mb-2">
				Guaranteed prize draw
			</div>

			<div class="flex  justify-center border-solid border-2 border-black font uppercase mb-8">
				connected wallet:
			</div>

			<!-- row evening gamblefi -->
			<div class="flex justify-evenly items-center mb-6">
				<div class="uppercase font-semibold text-lg">evening</div>
				<div class="bg-black text-white uppercase rounded-md p-px text-bold">
					<div>gamblefi</div>
					<div>gamblefi</div>
					<div>gamblefi</div>
				</div>
				<div class="uppercase font-semibold text-lg">played</div>
			</div>

			<div class="flex justify-between mb-6">
				<div class="uppercase font-semibold text-lg">total cost:</div>
				<div class="uppercase font-semibold text-lg">{plays.length} avax</div>
			</div>

			<div class="flex justify-center">
				<button on:click={handleBuy} class="bg-avaloto w-80 bg-indigo-500 text-white rounded h-12">buy now</button>
			</div>
		</div>

		<!-- right portion of card with ava loggo-->
		<div class="bg-indigo-500 w-1/6 justify-between flex flex-col py-2">
			<img class="h-8 sm:h-12" src="/assets/Avax_logo.svg" alt="avalanche crypto blockchain logo" />
			<img class="h-8 sm:h-12" src="/assets/Avax_logo.svg" alt="avalanche crypto blockchain logo" />
			<img class="h-8 sm:h-12" src="/assets/Avax_logo.svg" alt="avalanche crypto blockchain logo" />
			<img class="h-8 sm:h-12" src="/assets/Avax_logo.svg" alt="avalanche crypto blockchain logo" />
		</div>
	</main>
</div>

<style>
	@media only screen and (max-width: 1024px) {
		.hide {
			display: none;
		}
	}
</style>
