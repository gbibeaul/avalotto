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
	<section class="mt-80 p-6">
		<GameCard
			logoSrc="/assets/AVASCRATCH.svg"
			logoText="Avascratch logo"
			gameLink="avascratch"
			gameDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend pharetra enim scelerisque malesuada."
			gameImgSrc="/assets/avascratchOblique.png"
			gameImgText="Avascratch is a NFT scratch card game"
		/>
		<GameCard
			logoSrc="/assets/AVALotto_logo_white.svg"
			logoText="Avascratch logo"
			gameLink="lotto"
			gameDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend pharetra enim scelerisque malesuada."
			gameImgSrc="/assets/avalottosmall.png"
			gameImgText="Avalotto is a avalanche Lottery game"
		/>
	</section>
</main>

<style>
	@media only screen and (max-width: 600px) {
		:global(body) {
			background-image: url('/assets/SnowyPalace-Homepage-mobile.png');
		}

		.main {
			background-repeat: no-repeat;
			background-attachment: fixed;
			background-size: cover;
		}
	}
</style>
