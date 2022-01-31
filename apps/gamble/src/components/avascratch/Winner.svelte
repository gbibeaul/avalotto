<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	function handleClaimYourNftBtnClick() {
		dispatch('winnerClaimNft');
	}
</script>

<div class="relative flex flex-col h-full items-center justify-center" in:fade={{ duration: 750 }}>
	<img
		src="/assets/avascratch/winner_sunburst_bg.svg"
		alt="winner_sunburst_bg"
		class="absolute sunburst-bg"
	/>
	<img src="/assets/avascratch/spikeball.svg" alt="spikeball" class="absolute spikeball" />
	<img
		src="/assets/avascratch/winner-text.png"
		alt="winner-text"
		class="z-10 winner-claim-your-nft"
	/>

	<div class="absolute bottom-0 mb-4 z-20">
		<button
			class="border-solid rounded-md border-4 border-black py-4 px-20 claim-btn"
			type="submit"
			on:click={handleClaimYourNftBtnClick}
		>
			<div class="font-bold">CLAIM YOUR NFT</div>
		</button>
	</div>
</div>

<style>
	.sunburst-bg {
		left: 50%;
		transform: translate(-50%, 8%);
		max-height: 86%;
	}

	.spikeball {
		left: 50%;
		transform: translate(-50%, 5%);
		width: 90%;
	}

	.winner-claim-your-nft {
		width: 80%;
	}

	.claim-btn {
		background: linear-gradient(180deg, #f7da10 0%, #ffb900 100%);
	}
</style>
