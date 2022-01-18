<script lang="ts">
	import { onDestroy } from 'svelte';
	import { lottoStore } from '../../stores/lotto';

	let nextDrawCountdown: string;
	let timer = null;

	const updateNextDrawCountdown = (distanceInMinutes: number) => {
		const days = Math.floor(distanceInMinutes / (60 * 24));
		const hours = Math.floor((distanceInMinutes % (60 * 24)) / 60);
		const minutes = Math.floor(distanceInMinutes % 60);

		const dText = days > 0 ? days + (days == 1 ? ' DAY, ' : ' DAYS, ') : '';
		const hText = hours > 0 ? +hours + (hours == 1 ? ' HOUR, ' : ' HOURS, ') : '';
		const mText = minutes > 0 ? +minutes + (minutes == 1 ? ' MINUTE, ' : ' MINUTES,') : '';

		return dText + hText + mText;
	};

	const nowInMinutes = () => new Date().getTime() / 60000;

	$: {
		nextDrawCountdown = updateNextDrawCountdown($lottoStore.nextDrawOn / 60 - nowInMinutes());		
	}

	timer = setInterval(() => {
		nextDrawCountdown = updateNextDrawCountdown($lottoStore.nextDrawOn / 60 - nowInMinutes());		
	}, 60000);

	onDestroy(() => timer && clearInterval(timer));
</script>

<div class="lg:flex items-end lg:mt-0 mt-4 lg:pt-0 pt-4 lg:border-0 border-t-2 ">
	{#if nextDrawCountdown}
		<p class="text-white text-xs whitespace-nowrap">NEXT DRAW IN</p>
		<p class="text-white italic font-bold lg:ml-2 whitespace-nowrap">
			{nextDrawCountdown}
		</p>
	{/if}
</div>
