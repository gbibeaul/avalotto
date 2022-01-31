<script lang="ts">
	import FaDice from 'svelte-icons/fa/FaDice.svelte';
	import { fade } from 'svelte/transition';
	import FaTimes from 'svelte-icons/fa/FaTimes.svelte';
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

<div class="container px-8 flex md:flex-row flex-col justify-center  border-b-2 drop-shadow-sm border-gray-100 " in:fade={{ duration: 750 }}>
	<p class="w-full md:w-1/6 flex text-bold text-lg justify-center mt-8 ">PLAY {playNo}</p>
	<div class="flex container space-x-3 justify-center">
		<section class="flex py-4 space-x-3">
			<p
				class="h-16 w-16 rounded-md border-2 drop-shadow-sm border-gray-100 place-content-center flex items-center"
			>
				{num1}
			</p>
			<p
				class="h-16 w-16 rounded-md border-2 drop-shadow-sm  border-gray-100 place-content-center flex items-center"
			>
				{num2}
			</p>
			<p
				class="h-16 w-16 rounded-md border-2  drop-shadow-sm border-gray-100 place-content-center flex items-center"
			>
				{num3}
			</p>
		</section>
		<section class="space-x-3 flex items-baseline  ">
			<button class="h-8 w-8 icon " on:click={handleRandomNum}><FaDice /></button>
			<button disabled={isFirst} class="h-6 w-6" on:click={removePlay} class:disabled={isFirst} class:enabled={!isFirst}><FaTimes /></button>
		</section>
	</div>
</div>

<style>
	.disabled {
		opacity: 34%;
	}

    .enabled {
        color: #5046e4;

    }
	.icon {
		color: #5046e4;
	}

	.container {
		display: flex;
		align-items: baseline;
		justify-content: center;
	}
</style>
