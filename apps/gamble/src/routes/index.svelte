<script context="module">
	import { walletStore } from '../stores/wallet';
	import { notificationStore } from '../stores/notification';
	// export const prerender = true;

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

<!-- <script lang="ts">
	import FaBell from 'svelte-icons/fa/FaBell.svelte';
	import FaBars from 'svelte-icons/fa/FaBars.svelte';
	import NotificationPanel from '../components/NotificationPanel.svelte';
</script> -->

<main class="main h-full">
	<!-- <header class="flex lg:w-auto justify-end p-4 sticky top-0">
		<button on:click={handleNotification} class="h-8 mr-5 text-white"><FaBell /></button>
		<button class="h-8 text-white "><FaBars /></button>
	</header>
	<NotificationPanel />
	<section
		class="mt-80 p-6 lg:flex lg:mt-[32%] justify-around space-x-2 lg:space-y-0 sm:space-y-20 space-y-28"
	>
		<section class="h-80 bg-[#434343] rounded-3xl p-6 sm:flex lg:w-[500px] lg:h-[300px]">
			<div class="sm:w-2/3">
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
				src="/assets/avascratchCardTablet.png"
				alt="Avascratch is a NFT scratch card game"
				class="-mt-20 ml-20 justify-end sm:translate-y-32 sm:w-82 sm:ml-0 sm:scale-125 lg:scale-150 lg:-mt-82  lg:w-72 "
			/>
		</section>

		<section class="h-80 bg-[#434343] rounded-3xl p-6 sm:flex lg:w-[500px] lg:h-[300px]">
			<div class="sm:w-2/3">
				<img src="/assets/AVALotto_logo_white.svg" alt="Avalotto logo" />
				<p class="mt-4 text-white font-sans text-sm">
					Pick the right numbers to win a guaranteed prize draw jackpot of AVAX!
				</p>
				<button class="cursor-pointer mt-4 text-white py-2 border-white border-2 w-20 rounded-lg"
					><a href="lotto">Play</a></button
				>
			</div>
			<img
				src="/assets/avalottoCardTablet.png"
				alt="Avalotto is a avalanche Lottery game"
				class="-mt-20 ml-20 justify-end sm:translate-y-32 lg:translate-y-20 sm:w-82 sm:ml-0 sm:scale-125 lg:scale-[1.35]  lg:w-72 "
			/>
		</section>
	</section> -->
</main>

<!-- <style>
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
</style> -->
