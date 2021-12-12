<script lang="ts">
	import LaunchingSoon from '../components/LaunchingSoon.svelte';
	export const prerender = true;

	let email;
	let emailField;
	let done = false;

	const handleNotifyMe = async (e: Event) => {
		e.preventDefault();
		await fetch('/api/email-list', {
			method: 'POST',
			body: JSON.stringify({ email })
		});
		done = true;
		emailField.value = '';
	};
</script>

<LaunchingSoon />
<div class="bg-white">
	<div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
		<div
			class="bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4"
		>
			<div class="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
				<div class="lg:self-center">
					<h2 class="text-3xl font-extrabold text-white sm:text-4xl">
						<span class="block">Ready to dive in?</span>
						<span class="block">Gamblefi.xyz</span>
					</h2>
					<p class="mt-4 text-lg leading-6 text-indigo-200">
						The DeFi protocol that let's you earn and play to earn!
					</p>
					<p class="flex mt-2">
						<a
							href="https://github.com/gamblefi/gamble"
							target="_blank"
							class="text-gray-400 hover:text-gray-500 mr-2"
						>
							<span class="sr-only">GitHub</span>
							<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path
									fill-rule="evenodd"
									d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
									clip-rule="evenodd"
								/>
							</svg>
						</a>
						<a href="https://twitter.com/gamble_fi" target="_blank" class="text-gray-400 hover:text-gray-500">
							<span class="sr-only">Twitter</span>
							<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path
									d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
								/>
							</svg>
						</a>
					</p>
					<div class="mt-20">
						<form on:submit={handleNotifyMe} class="sm:flex">
							<label for="email-address" class="sr-only">Email address</label>
							<input
								bind:value={email}
								id="email-address"
								name="email-address"
								type="email"
								disabled={done}
								bind:this={emailField}
								autocomplete="email"
								required
								class="w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs rounded-md"
								placeholder="Enter your email"
							/>
							<div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
								<button
									type="submit"
									disabled={done}
									class="w-full flex items-center justify-center py-3 px-5 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									{#if done}
										<svg
											class="h-6 w-6 text-green-400"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											aria-hidden="true"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
									{:else}
										Notify me
									{/if}
								</button>
							</div>
						</form>
						{#if done}
							<p class="mt-4 text-lg leading-6 text-indigo-200">Thank you for subscribing!</p>
						{/if}
					</div>
				</div>
			</div>
			<div class="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1 flex">
				<img width="100%" height="100%" src="/assets/treasure.svg" alt="App screenshot" />
			</div>
		</div>
	</div>
</div>
