<script lang="ts">
	import FaBell from 'svelte-icons/fa/FaBell.svelte';
	import { notificationStore } from '../../stores/notification';
	
	const handleNotification = () => {
		notificationStore.toggleNotificationMenu(true);
	};
</script>

<header
	class="md:h-20 h-20 flex justify-between border-b-2 border-b-white/[.65] mx-6 py-4 items-center"
>
	<img class="h-12" src="/assets/AVALotto_logo_white.svg" alt="AVALotto logo" />
	<button on:click={handleNotification} class="h-8 text-white"><FaBell /></button>
</header>
