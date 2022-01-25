<script>
	export let logoSrc = '';
	export let logoText = '';
	export let gameLink = '';
	export let gameDescription = '';
	export let gameImgSrc = '';
	export let gameImgText = '';
</script>

<section class="h-80 bg-[#434343] rounded-3xl p-6 sm:flex lg:w-[520px] lg:h-[320px]">
	<div class="sm:w-2/3">
		<img src={logoSrc} alt={logoText} />
		<p class="mt-4 text-white font-sans">{gameDescription}</p>
		<button class="cursor-pointer mt-4 text-white py-2 border-white border-2 w-20 rounded-lg"
			><a href={gameLink}>Play</a></button
		>
	</div>
	<img src={gameImgSrc} alt={gameImgText} class="-mt-20 ml-20 justify-end sm:translate-y-32 lg:translate-y-12 sm:w-82 sm:ml-0 sm:scale-125  lg:w-72 " />
</section>
