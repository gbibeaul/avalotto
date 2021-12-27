<script lang="ts">
    export let active
</script>

<button
	type="button"
	class="{active
		? 'bg-indigo-600'
		: 'bg-gray-200'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
	role="switch"
	on:click
	aria-checked="false"
	aria-labelledby="availability-label"
	aria-describedby="availability-description"
>
	<!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
	<span
		aria-hidden="true"
		class="{active
			? 'translate-x-5'
			: 'translate-x-0'} pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
	/>
</button>
