<script lang="ts">
  import LaunchingSoon from '../components/LaunchingSoon.svelte';
	export const prerender = true;

	let email;
  let emailField;
	let done = false

	const handleNotifyMe = async (e: Event) => {
		e.preventDefault();
		await fetch('/api/email-list', {
			method: 'POST',
			body: JSON.stringify({ email })
		});
		console.log('hello');
		done = true;
		emailField.value = ''
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
            <p class="mt-4 text-lg leading-6 text-indigo-200">
              Tank you for subscribing!
            </p>
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
