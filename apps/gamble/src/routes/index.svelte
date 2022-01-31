<script context="module" lang="ts">
	import FaBell from 'svelte-icons/fa/FaBell.svelte';
	import FaWallet from 'svelte-icons/fa/FaWallet.svelte';
	import NotificationPanel from '../components/NotificationPanel.svelte';
	import { getShortenedAddress } from '../helpers/display.helpers';
	import { goto } from '$app/navigation';
	import { notificationStore } from '../stores/notification';
	import { requestAccount, walletStore, disconnectAccount } from '../stores/wallet';

	export async function load({ session }) {
		const { walletAddress = '', notifications } = session;
		notificationStore.updateNotificationTarget(notifications);
		walletStore.updateWalletAddress([walletAddress]);

		return {
			props: {}
		};
	}

	const handleNotification = () => {
		notificationStore.toggleNotificationMenu(true);
	};

	const handleRequestAccount = () => {
		requestAccount();
	};

	const handleRemoveAccount = () => {
		disconnectAccount();
	};
</script>

<main class="main h-full">
	<header
		class="flex py-8 fixed top-0 right-0 items-center  w-full justify-between px-8"
	>
		<a class="text-white text-xl" href="/docs">Docs</a>

		<div class="flex items-center">
			<button aria-label="notifications" on:click={handleNotification} class="h-6 w-6 mr-4 text-white">
				<FaBell />
			</button>
			{#if $walletStore.walletAddress.length > 0}
				<button
					aria-label="request account"
					on:click={handleRemoveAccount}
					class="text-white border-white border-2 py-2 px-6 rounded-lg flex justify-center items-center "
				>
					<span class="h-4 mr-3 ">
						<FaWallet />
					</span>
					{getShortenedAddress($walletStore.walletAddress)}
				</button>
			{:else}
				<button
					aria-label="request account"
					on:click={handleRequestAccount}
					class="text-white border-white border-2 py-2 px-6 rounded-lg flex justify-center items-center "
				>
					Connect Wallet
				</button>
			{/if}
		</div>
	</header>
	<NotificationPanel />
	<section
		class="relative pt-[500px]  pb-80 h-full p-6 lg:flex  justify-around space-x-2 lg:space-y-0 sm:space-y-20 space-y-28"
	>
		<section class="h-80 bg-[#434343] rounded-3xl p-6 sm:flex lg:w-[500px] lg:h-[330px]">
			<div class="sm:w-2/3 lg:w-1/2	">
				<img src="/assets/AVASCRATCH.svg" alt="Avascratch logo" />
				<p class="mt-4 text-white font-sans text-sm">
					Try your luck with our no-loss, win NFTs scratch game! Scratch three of the same number
					and receive a rare NFT!
				</p>
				<button class="cursor-pointer mt-4 text-white py-2 border-white border-2 w-20 rounded-lg"
					><a href="avascratch">Play</a></button
				>
			</div>
			<img
				on:click={() => goto('/avascratch')}
				src="/assets/avascratchTicket.svg"
				alt="Avascratch is a NFT scratch card game"
				class="relative -top-[50px] sm:top-[70px] sm:scale-[1.7] lg:scale-[2.3] lg:w-1/2 cursor-pointer"
				width="422"
				height="362"
			/>
		</section>

		<section
			class="h-80 bg-[#434343] rounded-3xl p-6 sm:flex lg:w-[500px] lg:h-[330px]"
			href="lotto"
		>
			<div class="sm:w-2/3 overflow-hidden">
				<img src="/assets/AVALotto_logo_white.svg" alt="Avalotto logo" />
				<p class="mt-4 text-white font-sans text-sm ">
					Pick the right numbers to win a guaranteed prize draw jackpot of AVAX!
				</p>
				<button class="cursor-pointer mt-4 text-white py-2 border-white border-2 w-20 rounded-lg "
					><a href="lotto">Play</a></button
				>
			</div>
			<a href="lotto">
				<img
					src="/assets/lottoTicket.svg"
					width="422"
					height="362"
					alt="Avalotto is a avalanche Lottery game"
					class="relative -top-[40px] sm:top-[60px] sm:scale-[1.7] lg:scale-[1.9]"
				/>
			</a>
		</section>
	</section>
</main>

<style>
	.main {
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-size: cover;
		background-image: url('/assets/SnowyPalace-Homepage.webp');
	}
	@media only screen and (max-width: 640px) {
		.main {
			background-repeat: no-repeat;
			background-attachment: fixed;
			background-size: cover;
			background-image: url('/assets/SnowyPalaceBackgroundMobile.webp');
		}
	}
	@media only screen and (max-width: 1024px) {
		.main {
			background-repeat: no-repeat;
			background-attachment: fixed;
			background-size: cover;
			background-image: url('/assets/SnowyPalaceBackgroundTablet.webp');
		}
	}
</style>
