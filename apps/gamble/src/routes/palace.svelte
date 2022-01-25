<script context="module">
	import { walletStore } from '../stores/wallet';
	import { notificationStore } from '../stores/notification';

	export async function load({ session }) {
		const { walletAddress = '', notifications } = session;
		walletStore.updateWalletAddress([walletAddress]);
		notificationStore.updateNotificationTarget(notifications);

		return {
			props: {}
		};
	}

	const handleNotification = () => {
		notificationStore.toggleNotificationMenu(true);
	};
</script>

<script lang="ts">
	import FaBell from 'svelte-icons/fa/FaBell.svelte';
	import FaBars from 'svelte-icons/fa/FaBars.svelte';
	import NotificationPanel from '../components/NotificationPanel.svelte';
	import GameCard from '../components/palace/GameCard.svelte';
</script>

<main class="main h-full">
	<header class="flex lg:w-auto justify-end p-4 sticky top-0">
		<button on:click={handleNotification} class="h-8 mr-5 text-white"><FaBell /></button>
		<button class="h-8 text-white "><FaBars /></button>
	</header>
	<NotificationPanel />
	<section class="mt-80 p-6 lg:flex lg:mt-[30%] justify-around space-x-2 lg:space-y-0 sm:space-y-20 space-y-28">
			<GameCard
				logoSrc="/assets/AVASCRATCH.svg"
				logoText="Avascratch logo"
				gameLink="avascratch"
				gameDescription="Try your luck with our no-loss, win NFTs scratch game! Scratch three of the same number and receive a rare NFT!"
				gameImgSrc="/assets/avascratchCardTablet.png"
				gameImgText="Avascratch is a NFT scratch card game"
			/>
		<GameCard
			logoSrc="/assets/AVALotto_logo_white.svg"
			logoText="Avascratch logo"
			gameLink="lotto"
			gameDescription="Pick the right numbers to win a guaranteed prize draw jackpot of AVAX!"
			gameImgSrc="/assets/avalottoCardTablet.png"
			gameImgText="Avalotto is a avalanche Lottery game"
		/>
	</section>
</main>

<style>
	:global(body) {
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-size: cover;
		background-image: url('/assets/SnowyPalace-Homepage.jpg');
	}
	@media only screen and (max-width: 640px) {
		:global(body) {
			background-repeat: no-repeat;
			background-attachment: fixed;
			background-size: cover;
			background-image: url('/assets/SnowyPalaceBackgroundMobile.png');
		}
	}
	@media only screen and (max-width: 1024px) {
		:global(body) {
			background-repeat: no-repeat;
			background-attachment: fixed;
			background-size: cover;
			background-image: url('/assets/SnowyPalaceBackgroundTablet.png');
		}
	}
</style>
