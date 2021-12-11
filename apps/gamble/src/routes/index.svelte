<script lang="ts" context="module">
	export const prerender = true;
	import { stateStore } from '../stores/state';
	// import { routing } from "../stores/routing";

	// let userAddress;
	// let bets;
	// let route;

	// stateStore.subscribe((value) => {
	//   userAddress = value.userAddress;
	//   bets = value.bets;
	// });

	// routing.subscribe((value) => {
	//   route = value;
	// });
</script>

<div class="bg-white">
	<div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
		<div class="bg-indigo-700 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
			<div class="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
				<div class="lg:self-center">
					<h2 class="text-3xl font-extrabold text-white sm:text-4xl">
						<span class="block">Ready to dive in?</span>
						<span class="block">Gamblefi.xyz</span>
					</h2>
					<p class="mt-4 text-lg leading-6 text-indigo-200">
						The DeFi protocol that let's you earn and play to earn!
					</p>
					<div
						class="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-indigo-600 hover:bg-indigo-50"
						>Start earning today!</div
					>
				</div>
			</div>
			<div class="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1 flex">
				<img src="/assets/treasure.svg" alt="App screenshot" />
			</div>
		</div>
	</div>
</div>
