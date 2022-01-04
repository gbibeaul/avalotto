<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	export function load({ error, status }) {
		return {
			props: {
				title: `${error.message}`
			}
		};
	}
</script>

<script>
	export let title;
</script>

<div class="flex h-full justify-center items-center">
	<h1 class="text-white text-3xl">{title}</h1>
</div>
