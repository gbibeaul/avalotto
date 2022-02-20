<script lang="ts">
	import FaBell from 'svelte-icons/fa/FaBell.svelte';
	import FaBars from 'svelte-icons/fa/FaBars.svelte';
	import { notificationStore } from '../../stores/notification';
	import NextDrawCountdown from './NextDrawCountdown.svelte';

	const handleNotification = () => {
		notificationStore.toggleNotificationMenu(true);
	};
</script>

<header
	class="lg:h-34 h-26 flex flex-wrap lg:flex-nowrap items-center lg:border-b-2 border-b-white/[.65] mx-6 py-4"
>
	<a class="lg:w-full w-1/2" href="/">
		<img
			src="/assets/AVALotto_logo_white.svg"
			class="object-contain lg:w-28 w-16 "
			alt="AVALotto logo"
		/>
	</a>

	<div class="order-2 mr-4 lg:w-auto w-full">
		<NextDrawCountdown />
	</div>

	<div class="flex lg:w-auto w-1/2 justify-end  lg:order-3">
		<button on:click={handleNotification} class="h-8 mr-4 text-white"><FaBell /></button>
		<button class="h-8 text-white "><FaBars /></button>
	</div>
</header>
