<script lang="ts">
	import FaDice from 'svelte-icons/fa/FaDice.svelte';
	import { fade } from 'svelte/transition';
	import MDClose from 'svelte-icons/md/MdClose.svelte';
	export let playNo: number;
	export let num1: number;
	export let num2: number;
	export let num3: number;
	export let isFirst: boolean;
	export let removePlay: VoidFunction;

	const getRandom = () => Math.floor(Math.random() * 100);

	const handleRandomNum = () => {
		num1 = getRandom();
		num2 = getRandom();
		if (num1 === num2) {
			num2 = getRandom();
		}

		num3 = getRandom();
		if (num1 === num3 || num2 === num3) {
			num3 = getRandom();
		}
	};
</script>

<div
	class="flex md:h-24 h-36 flex-row justify-between flex-wrap mt-3 border-b drop-shadow-sm border-[#C0C0C0] "
	in:fade={{ duration: 750 }}
>
	<p class="w-full md:w-1/6 md:mt-5 flex font-bold text-lotto-black text-lg justify-center ">
		PLAY {playNo}
	</p>

	<section class="flex  space-x-3">
		<div class="lotto-number-container shadow-lottoNum">
			<p class="font-lotto text-lotto-purple text-2xl font-extrabold italic ">
				{num1}
			</p>
		</div>
		<div class="lotto-number-container  shadow-lottoNum rounded-md">
			<p class="font-lotto text-lotto-purple text-2xl font-extrabold italic ">
				{num2}
			</p>
		</div>
		<div class="lotto-number-container  shadow-lottoNum rounded-md">
			<p class="font-lotto text-lotto-purple text-2xl font-extrabold italic ">
				{num3}
			</p>
		</div>
	</section>
	<section class="flex items-baseline mt-5">
		<button class="h-8 w-8 icon mr-4 " on:click={handleRandomNum}><FaDice /></button>
		<button class="h-6 w-6" on:click={removePlay} class:disabled={isFirst} class:enabled={!isFirst}
			><MDClose /></button
		>
	</section>
</div>

<style>
	.disabled {
		opacity: 0%;
	}

	.enabled {
		color: #5046e4;
	}
	.icon {
		color: #5046e4;
	}
	.lotto-number-container {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 4rem;
		height: 4rem;
		border-radius: 0.375rem;
	}
</style>
