<script lang="ts">
	import { fly } from 'svelte/transition';
	import { notificationStore } from '../../stores/notification';
	import { clickOutside } from '../../directives/clickOutside';
	let email = '';
	let discord = '';
	let browser = false;

	let open: boolean;

	notificationStore.subscribe((value) => {
		open = value.menuOpen;
	});

	const handleClose = () => {
		notificationStore.toggleNotificationMenu(false);
	};

	const handleBrowser = () => {
		browser = !browser;
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		const { signature, address } = await notificationStore.approveNotifications();

		if (signature) {
			fetch('/api/notification-target', {
				method: 'POST',
				body: JSON.stringify({ email, discord, signature, address, browser })
			});
		}
		handleClose();
	};

	const discordPattern = '^.{3,32}#[0-9]{4}$';
</script>

{#if open}
	<div
		class="fixed inset-0 overflow-hidden"
		aria-labelledby="slide-over-title"
		role="dialog"
		aria-modal="true"
	>
		<div class="absolute inset-0 overflow-hidden">
			<div class="absolute inset-0" aria-hidden="true">
				<div class="fixed inset-y-0 pl-16 max-w-full right-0 flex">
					<div
						use:clickOutside
						on:click_outside={handleClose}
						transition:fly={{ x: 300 }}
						class="w-screen max-w-md {open
							? 'transform transition ease-in-out duration-500 sm:duration-700'
							: 'transform transition ease-in-out duration-500 sm:duration-700'}"
					>
						<form
							on:submit={handleSubmit}
							class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl"
						>
							<div class="flex-1 h-0 overflow-y-auto">
								<div class="py-6 px-4 sm:px-6">
									<div class="flex items-center justify-between">
										<h2 class="text-lg font-medium" id="slide-over-title">Notifications</h2>
										<div class="ml-3 h-7 flex items-center">
											<button
												type="button"
												on:click={handleClose}
												class="rounded-md text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
											>
												<span class="sr-only">Close panel</span>
												<svg
													class="h-6 w-6"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke="black"
													aria-hidden="true"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M6 18L18 6M6 6l12 12"
													/>
												</svg>
											</button>
										</div>
									</div>
									<div class="mt-1">
										<p class="text-sm text-indigo-300">
											Stay up to date with with jackpot announcements and news! Decide the ways you
											would like to hear from us.
										</p>
									</div>
								</div>
								<div class="flex-1 flex flex-col justify-between">
									<div class="px-4 divide-y divide-gray-200 sm:px-6">
										<div class="space-y-6 pt-6 pb-5">
											<div>
												<label for="email" class="block text-sm font-medium text-gray-900">
													Email
												</label>
												<div class="mt-1">
													<input
														bind:value={email}
														type="text"
														name="email"
														id="email"
														placeholder="avalotto@email.com"
														class="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
													/>
												</div>
											</div>
											<div>
												<label for="discord" class="block text-sm font-medium text-gray-900">
													Discord ID
												</label>
												<div class="mt-1">
													<input
														bind:value={discord}
														type="text"
														name="discord"
														id="discord"
														pattern={discordPattern}
														placeholder="user#1234"
														class="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
													/>
												</div>
											</div>

											<div class="flex items-center justify-between">
												<span class="flex-grow flex flex-col">
													<span class="text-sm font-medium text-gray-900" id="availability-label"
														>Browser Notifications</span
													>
												</span>
												<!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
												<button
													type="button"
													class="{browser
														? 'bg-indigo-600'
														: 'bg-gray-200'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
													role="switch"
													on:click={handleBrowser}
													aria-checked="false"
													aria-labelledby="availability-label"
													aria-describedby="availability-description"
												>
													<!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
													<span
														aria-hidden="true"
														class="{browser
															? 'translate-x-5'
															: 'translate-x-0'} pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
													/>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="flex-shrink-0 px-4 py-4 flex justify-end">
								<button
									type="button"
									class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									Cancel
								</button>
								<button
									type="submit"
									class="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									Save
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
