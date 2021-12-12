<script context="module">
	import { stateStore } from '../stores/state';
	import { lottoProvider } from '../transport/lotto';
	export const ssr = false;
	export async function load({ session }) {
		const { address = '' } = session;
		const lotto = await lottoProvider();
		const jackpot = await lotto.getCurrentJackpot();

		const getRandom = () => Math.floor(Math.random() * 100);

		return {
			props: {
				jackpot,
				addressPresent: address.length > 0,
				num1: getRandom(),
				num2: getRandom(),
				num3: getRandom()
			}
		};
	}
</script>

<script lang="ts">
	import { utils, BigNumber } from 'ethers';
	import TestBanner from '../components/TestBanner.svelte';
	import FaDice from 'svelte-icons/fa/FaDice.svelte';
	import { each } from 'svelte/internal';

	const getRandom = () => Math.floor(Math.random() * 100);

	export let jackpot;
	export let addressPresent;
	export let num1;
	export let num2;
	export let num3;
	let bets;

	stateStore.subscribe((value) => {
		jackpot = value.jackpot;
		addressPresent = value.userAddress.length > 0;
		bets = value.bets.map((nums) => nums.map((num) => num.toNumber()).join(','));
	});

	const handleRandomNum = () => {
		num1 = getRandom();
		num2 = getRandom();
		if (num1 === num2) {
			num2 = getRandom();
		}

		num3 = getRandom();
		if (num1 === num2 || num1 === num3 || num2 === num3) {
			num3 = getRandom();
		}
	};

	const handleBet = async () => {
		const nums = [num1, num2, num3].map(BigNumber.from);

		await stateStore.placeBet(nums);
		handleRandomNum();
	};
</script>

<TestBanner />
<div class="bg-white">
	<div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
		<div class="text-center">
			<h2 class="text-base font-semibold text-indigo-600 tracking-wide uppercase">
				The Current Jackpot is
			</h2>
			<p
				class="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"
			>
				{utils.formatEther(jackpot)} AVAX!
			</p>
			<p class="max-w-xl mt-5 mx-auto text-xl text-gray-500">
				{#if !addressPresent}
					<div
						class="relative p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500 flex justify-center"
					>
						<div
							class="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg bg-pink-500"
						>
							<img src="assets/metamask.png" alt="Fox face representing metamask logo" />
						</div>
						<div>
							<h3 class="text-sm font-medium text-gray-900">
								<a href="/lotto" on:click={stateStore.connectMetamask} class="focus:outline-none">
									<span class="absolute inset-0" aria-hidden="true" />
									Connect Metamask<span aria-hidden="true"> &rarr;</span>
								</a>
							</h3>
							<p class="mt-1 text-sm text-gray-500">
								An Avalanche wallet is needed in order to play Avalotto
							</p>
						</div>
					</div>
				{/if}
				{#if addressPresent}
					<p class="mt-1 text-sm text-gray-500">
						By buying a ticket you will be able to play the lottery
					</p>
					<div class="max-w-4xl mx-auto">
						<dl class="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-4">
							<div
								class="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r"
							>
								<dd class="order-1 text-5xl font-extrabold text-indigo-600">{num1}</dd>
							</div>
							<div
								class="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r"
							>
								<dd class="order-1 text-5xl font-extrabold text-indigo-600">{num2}</dd>
							</div>
							<div
								class="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l"
							>
								<dd class="order-1 text-5xl font-extrabold text-indigo-600">{num3}</dd>
							</div>
							<div
								class="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l"
							>
								<button
									on:click={handleBet}
									type="submit"
									class="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									Buy!
								</button>
							</div>
						</dl>
					</div>

					<div class="flex justify-center">
						<button
							on:click={handleRandomNum}
							type="button"
							class="group p-4 mt-6 flex items-center justify-between rounded-full border border-gray-300 shadow-sm space-x-3 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							<span class="min-w-0 flex-1 flex items-center space-x-3">
								<span class="block flex-shrink-1 h-6">
									<FaDice />
								</span>
								<span class="block min-w-0 flex-1">
									<span class="block text-sm font-medium text-gray-900 truncate"
										>Randomize your ticket!</span
									>
								</span>
							</span>
						</button>
					</div>

					<div class="flow-root mt-4">
						<ul role="list">
							{#each bets as bet}
								<li class="flex justify-center">
									<div class="relative pb-8">
										<div class="flex space-x-3">
											<div>
												<span
													class="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white"
												>
													<svg
														class="h-5 w-5 text-white"
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 20 20"
														fill="currentColor"
														aria-hidden="true"
													>
														<path
															fill-rule="evenodd"
															d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
															clip-rule="evenodd"
														/>
													</svg>
												</span>
											</div>
											<div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
												<div>
													<p class="text-sm text-gray-500">Bought {bet}</p>
												</div>
											</div>
										</div>
									</div>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</p>
		</div>
	</div>
</div>
