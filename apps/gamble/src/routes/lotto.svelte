<script context="module">
	import { walletStore } from '../stores/wallet';
	import { notificationStore } from '../stores/notification';

	import { lottoStore } from '../stores/lotto';
	import { lottoProvider } from '../transport/lotto';

	export async function load({ session }) {
		const { walletAddress = '', notifications } = session;
		walletStore.updateWalletAddress([walletAddress]);

		const lotto = await lottoProvider();
		const jackpot = await lotto.getCurrentJackpot();
		const nextDrawOn = await lotto.getNextDrawTime();

		lottoStore.updateJackpot(jackpot);
		lottoStore.updateNextDrawOn(nextDrawOn);
		notificationStore.updateNotificationTarget(notifications);

		return {
			props: {}
		};
	}
</script>

<script lang="ts">
	import Banner from '../components/lotto/Banner.svelte';
	import TicketLeftSide from '../components/lotto/TicketLeftSide.svelte';
	import TicketReview from '../components/lotto/TicketReview.svelte';
	import NotificationPanel from '../components/NotificationPanel.svelte';
</script>

<div class="h-full gradient justify-content-around">
	<Banner />
	<div class="lg:flex lg:justify-between px-2">
		<TicketLeftSide />
		<TicketReview />
		<NotificationPanel />
	</div>
</div>

<style>
		:global(body) {
			background: linear-gradient(116.82deg, #d32d28 0%, #6c1280 48.44%, #1102df 100%);
	}
	
</style>