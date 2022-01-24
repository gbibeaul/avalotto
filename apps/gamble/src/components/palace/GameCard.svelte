<script>
	export let logoSrc = '';
	export let logoText = '';
	export let gameLink = '';
	export let gameDescription = '';
	export let gameImgSrc = '';
	export let gameImgText = '';
</script>

<section class="h-80 bg-[#434343] rounded-3xl p-6 mt-20">
	<img src={logoSrc} alt={logoText} />
	<p class="mt-4 text-white font-sans">{gameDescription}</p>
	<button class="cursor-pointer mt-4 text-white py-2 border-white border-2 w-24 rounded-lg"
		><a href={gameLink}>Play</a></button
	>
    <img src={gameImgSrc} alt={gameImgText} class="-mt-20" />
</section>
