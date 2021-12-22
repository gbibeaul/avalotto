<script lang="ts">
	import { BigNumber, utils } from 'ethers';
	import { lottoStore } from '../../stores/lotto';

	let jackpot: BigNumber;

	lottoStore.subscribe((value) => {
		jackpot = value.jackpot;
	});
</script>

<div class="justify-center flex">
	<main class="w-11/12 bg-white mt-12 rounded-md overflow-y-scroll mb-36">
		<hgroup
			class="h-48 flex flex-col justify-center py-6 border-b-2 shadow-[0_15px_10px_-15px_#111] "
		>
			<strong class="font-bold flex justify-center text-sm uppercase">The current jackpot is</strong
			>
			<em class="flex justify-center font-italic text-6xl">{utils.formatEther(jackpot)} AVAX</em>
		</hgroup>

		<section class="flex justify-center py-4">
			<button class="w-40 bg-avaloto rounded text-indigo-500 border-indigo-500 border-2 h-16">
				Connect Metamask
			</button>
		</section>
	</main>
</div>
