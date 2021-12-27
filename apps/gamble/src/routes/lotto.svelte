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

		lottoStore.updateJackpot(jackpot);
		notificationStore.updateNotificationTarget(notifications);


		return {
			props: {}
		};
	}

</script>

<script lang="ts">
	import Banner from '../components/lotto/Banner.svelte';
	import TicketPurchase from '../components/lotto/TicketPurchase.svelte';
	import TicketReview from '../components/lotto/TicketReview.svelte';
	import NotificationPanel from '../components/lotto/NotificationPannel.svelte';
</script>

<div class="h-full gradient justify-content-around">
	<Banner />
	<div class="lg:flex lg:justify-between px-2">
		<TicketPurchase />
		<TicketReview />
		<NotificationPanel />
	</div>
</div>
