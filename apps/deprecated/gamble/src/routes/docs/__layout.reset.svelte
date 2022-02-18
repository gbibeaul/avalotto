<script>
	import './docs.css';
	export let metadata;
	export let title = [metadata?.title, 'Snowy Palace Docs'].filter((p) => !!p).join(' | ');
	import { fly } from 'svelte/transition';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>
<div class="bg-white">
	<header class="p-4 bg-slate-600 header fixed top-0 w-full">
		<a href="/">
			<img
				class="logo cursor-pointer"
				src="/assets/snowy-palace-documentation-header.png"
				alt="Snowy Palace Documentation"
			/>
		</a>
	</header>
	<section class="flex justify-center mt-40 bg-white h-full">
		<article class="prose text-center">
			<slot />
		</article>
	</section>
</div>
<style>


	.header {
		min-height: 125px;
		background-image: url(/assets/snowy-palace-documentation-banner.png);
		background-size: cover;
	}
	.logo {
		max-width: 280px;
	}
</style>
