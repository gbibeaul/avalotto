<script lang="ts">
	import { BigNumber, utils } from 'ethers';
	import Play from './Play.svelte';
	import { fade } from 'svelte/transition';
	import { lottoStore, LottoSteps } from '../../stores/lotto';
	import { session } from '$app/stores';
	import { withPrevious } from '../../helpers/withPrevious.helpers';

	let jackpot: BigNumber;
	const [currentStep] = withPrevious(LottoSteps.SELECT_PLAYS);
	let plays = $lottoStore.plays;

	lottoStore.subscribe((value) => {
		$currentStep = value.currentStep;
		jackpot = value.jackpot;
	});

	const getRandom = () => Math.floor(Math.random() * 100);

	const handleAddPlay = () => {
		plays = [...plays, [getRandom(), getRandom(), getRandom()]];
	};

	const handleNewPlay = () => {
		lottoStore.resetState();
	};

	const handleRequestAccount = () => {
		window.ethereum.request({ method: 'eth_requestAccounts' }).then((wallets) => {
			session.update((s) => ({ ...s, walletAddress: wallets[0] }));
		});
	};

	const handleRemovePLay = (index) => {
		plays = plays.filter((_, i) => index !== i);
	};

	const handleReviewTicket = () => {
		lottoStore.setStep(LottoSteps.REVIEW_TICKET);
		lottoStore.setPlays(plays);
	};

	$: if ($currentStep === LottoSteps.CONFIRMED) {
		plays = [[getRandom(), getRandom(), getRandom()]];
	}

	$: if ($currentStep === LottoSteps.SELECT_PLAYS) {
		lottoStore.setPlays(plays);
	}
</script>

<div class="justify-center flex lg:w-4/6" class:hide={$currentStep === LottoSteps.REVIEW_TICKET}>
	<main class="w-11/12 bg-white mt-4 rounded-md overflow-y-scroll mb-36">
		<hgroup class="h-48 flex flex-col justify-center py-6 border-b-2  ">
			<strong class="font-bold flex justify-center text-sm uppercase"
				>The current jackpot (FUJI TEST) is</strong
			>
			<em class="flex justify-center font-italic text-6xl"
				>{(+utils.formatEther(jackpot)).toFixed(2)} AVAX
			</em>
		</hgroup>
		{#if $currentStep === LottoSteps.SELECT_PLAYS}
			{#if $session.walletAddress}
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
			{:else}
				<section class="bg-white flex h-24 items-center justify-center flex-col ">
					<button
						aria-label="request account"
						on:click={handleRequestAccount}
						class="w-40 bg-avaloto rounded text-indigo-500 border-indigo-500 border-2 h-16"
					>
						Connect Wallet
					</button>
				</section>
			{/if}
		{/if}
		{#if $currentStep === LottoSteps.CONFIRMING}
			<section class="h-64 flex flex-col justify-center py-8" in:fade={{ duration: 750 }}>
				<strong class="font-bold flex justify-center text-sm">Confirming...</strong>
			</section>
		{/if}
		{#if $currentStep === LottoSteps.CONFIRMED}
			<section class="h-64 flex flex-col justify-center py-8 mt-6" in:fade={{ duration: 750 }}>
				<strong class="font-bold flex justify-center text-sm">Ticket purchase confirmed</strong>
				<span class="flex justify-center text-sm">
					<div><b>Tx ID: </b> {$lottoStore.txHash.slice(0, 18)}...</div>
				</span>
				<em
					class="flex font-bold justify-center text-5xl text-indigo-500 text-center uppercase mt-6"
					>good luck!</em
				>
				<span class="flex mt-6 justify-center">
					<svg class="w-28" viewBox="0 0 191 191" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M139.677 77.0894L139.587 77.0804L139.483 77.0685L139.376 77.0595C137.747 76.9234 136.106 77.0351 134.511 77.3908C133.906 73.8162 132.331 70.4765 129.957 67.7364C128.377 65.9084 126.449 64.4135 124.285 63.339C122.121 62.2645 119.765 61.6319 117.354 61.4781L117.228 61.4692C116.811 61.4393 116.393 61.4243 115.975 61.4244C109.254 61.4244 103.232 65.14 99.7908 70.7506L95.3142 62.3496L102.733 36.5526C103.351 34.3164 103.507 31.9777 103.19 29.6794C102.874 27.381 102.092 25.1714 100.892 23.1856C98.3434 18.915 93.9981 15.7754 88.9784 14.5697L88.8531 14.5399L88.7277 14.516C87.2767 14.1706 85.7904 13.9954 84.2989 13.9937C82.0527 13.9783 79.827 14.422 77.7583 15.2975C75.6896 16.173 73.8217 17.4619 72.2689 19.0851L70.4604 15.6978C67.5118 9.78577 61.1491 5.96875 54.2194 5.96875C51.7095 5.96875 49.2683 6.4552 46.9554 7.4102L46.9316 7.41617L46.5555 7.56838C42.0342 9.52613 38.4977 13.1969 36.8533 17.6377C36.0681 19.727 35.721 21.9555 35.8334 24.1847C35.9458 26.4138 36.5155 28.5961 37.5069 30.5958L37.5487 30.6794L37.5934 30.76L55.9832 65.2713L42.3326 109.506L42.3028 109.598L42.2789 109.691C42.2282 109.861 42.1237 110.132 42.0043 110.485C35.5999 128.465 38.8081 145.999 51.5335 162.601C62.2981 176.642 80.661 185.031 100.65 185.031C120.756 185.031 138.319 176.708 146.475 163.308C153.787 151.317 153.951 132.903 152.674 118.996C153.444 117.207 153.9 115.299 154.02 113.356L155.151 95.5209C155.742 86.15 148.806 77.9071 139.677 77.0894V77.0894ZM46.5496 23.4452C42.6788 16.1753 50.1845 11.6152 54.2194 11.6152C58.8929 11.6152 63.3367 14.0743 65.3959 18.2674L71.302 29.3483L63.7276 55.6795L46.5496 23.4452V23.4452ZM78.0317 27.4533C78.9807 23.9556 82.3024 19.6611 87.6414 20.058C94.9173 20.5982 99.0447 28.4471 97.269 34.9978L89.2231 62.9763L101.534 86.0843L101.047 92.2828C90.6676 93.7333 87.6056 90.6504 87.4504 85.0756L89.2231 62.9823L80.5684 93.0558C71.0692 99.4722 60.0986 101.684 55.6549 105.202L78.0317 27.4533V27.4533ZM148.347 113.003C148.23 114.747 147.723 116.442 146.863 117.963C148.176 130.85 148.448 149.171 141.611 160.386C140.666 161.93 139.587 163.388 138.388 164.743V164.74C116.984 182.417 75.6979 184.787 55.0789 151.776C47.7135 139.97 46.4988 116.913 54.1299 108.512C59.1675 103.782 67.4044 102.215 77.4945 96.4729C87.8981 90.5459 89.9782 99.893 107.696 100.391C110.648 100.475 113.235 101.898 113.883 105.122C114.769 109.533 112.227 115.415 106.485 118.136C90.1483 125.866 88.868 114.913 84.8838 119.187C80.652 123.723 78.6286 124.801 75.0623 130.065C73.8834 131.796 74.6773 135.714 75.871 139.475C75.3368 137.001 75.2383 134.801 76.0382 133.622C79.5627 128.433 81.5831 127.301 85.7165 122.9C102.214 125.908 114.728 140.146 114.728 157.291C114.728 158.751 114.605 160.18 114.42 161.595C116.294 157.894 117.375 153.725 117.375 149.296C117.374 144.441 116.078 139.675 113.62 135.488C114.509 132.741 116.074 130.262 118.171 128.278C120.268 126.294 122.829 124.868 125.621 124.132C126.784 123.822 127.954 123.667 129.118 123.598C126.327 122.412 123.22 122.19 120.287 122.965C118.136 123.532 116.158 124.621 114.531 126.138C112.903 127.654 111.676 129.55 110.958 131.656C108.217 128.387 104.77 125.782 100.877 124.037C102.76 123.613 104.906 122.903 107.449 121.7C109.669 120.678 111.564 119.063 112.925 117.032C118.243 117.381 123.072 114.352 125.54 109.634C123.185 111.305 116.897 112.929 114.966 111.669C117.742 102.824 115.211 99.4692 105.175 97.5562C105.175 97.4757 106.867 75.5286 106.867 75.5286C107.022 73.4723 109.039 66.5128 117.566 66.5128C124.857 66.5128 129.673 74.2513 129.07 82.0166L128.686 86.9766L127.378 103.8C127.236 105.519 126.799 107.201 126.086 108.772L125.925 111.278C125.525 117.65 130.008 123.07 136.152 123.583L136.287 123.592C140.781 123.974 144.804 121.566 146.816 117.749C144.846 119.071 142.458 119.805 139.922 119.593L139.769 119.578C133.637 119.065 129.136 113.573 129.539 107.199L130.661 89.3552C130.772 87.6362 133.98 81.8256 139.68 82.1748C145.837 82.5508 149.863 88.7852 149.46 95.1628L148.347 113.003"
							fill="#5046E4"
						/>
					</svg>
				</span>
			</section>
			<section class="flex justify-center py-4">
				<button
					on:click={handleNewPlay}
					class="w-40 bg-avaloto rounded text-indigo-500 border-indigo-500 border-2 h-16"
				>
					Play again
				</button>
			</section>
		{/if}
	</main>
</div>
{#if $currentStep === LottoSteps.SELECT_PLAYS}
	<footer
		class="fixed left-0 bottom-0 w-full bg-white h-28 place-content-center flex p-6 lg:invisible shadow-[0_0px_4px_21px_rgba(0,0,0,0.2)]"
	>
		<button on:click={handleReviewTicket} class="bg-avaloto w-72 bg-indigo-500 text-white rounded"
			>Review Transaction</button
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
