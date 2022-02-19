<script>
	import MdArrowBack from 'svelte-icons/md/MdArrowBack.svelte';
	import { goto } from '$app/navigation';
	import Banner from '../../components/lotto/Banner.svelte';
	import bg404 from '../../../static/assets/404_bg_image.png';
</script>

<div class="h-screen ">
	<Banner />

	<img
		src={bg404}
		alt="ticket not found"
		class="object-cover animate-pulse float-right h-[calc(100%-110px)]"
	/>

	<div
		class="absolute lg:w-1/3 md:w-1/3 w-1/2 lg:left-48 md:left-36 left-4 lg:top-48  md:top-48 top-40"
	>
		<p class=" text-white lg:text-6xl md:text-5xl text-4xl font-bold underline uppercase">
			Ticket not found
		</p>
		<p class="text-white text-sm uppercase mt-2 font-medium">Check your link and try again</p>
		<button class="h-10 text-white mt-2 " on:click={() => goto('/lotto')}><MdArrowBack /></button>
	</div>
</div>
