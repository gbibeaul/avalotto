<script>
	import { fade } from 'svelte/transition';
</script>

<div id="title-container" class="w-full relative mt-6" out:fade={{ duration: 750 }}>
	<img class="w-full absolute" src="/assets/avascratch/spikeball.svg" alt="spikeball_background" />
	<div class="mt-8 relative flex flex-col items-center">
		<img src="/assets/avascratch/main_title.png" alt="main_title" class="main-title" />
		<div class="font-bold text-avascratch-background text-xl leading-4">CURRENT JACKPOT</div>
	</div>
	<img
		class="w-full max-w-md mt-2 m-auto z-10 relative"
		src="/assets/avascratch/three_chances_to_win.png"
		alt="three_chances_to_win"
	/>
</div>

<style>
	.main-title {
		max-width: 85%;
	}
</style>
