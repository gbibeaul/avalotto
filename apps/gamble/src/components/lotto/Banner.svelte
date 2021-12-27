<script lang="ts">
	import NextDrawCountdown from './NextDrawCountdown.svelte';
</script>

<header
	class="lg:h-34 h-26 lg:flex justify-between items-center lg:border-b-2 border-b-white/[.65] mx-6 py-4"
>
	<img
		src="/assets/AVALotto_logo_white.svg"
		class="object-contain lg:w-28 w-16 "
		alt="AVALotto logo"
	/>

	<NextDrawCountdown />
</header>
