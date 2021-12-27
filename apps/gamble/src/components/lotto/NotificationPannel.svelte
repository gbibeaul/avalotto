<script lang="ts">
	import { fly } from 'svelte/transition';
	import { session } from '$app/stores';
	import Switch from '../Switch.svelte';
	import { notificationStore } from '../../stores/notification';
	import { clickOutside } from '../../directives/clickOutside';

	let email;
	let discord;
	let browser;

	let open: boolean;

	let showEmail = email?.length > 0;
	let showDiscord = discord?.length > 0;

	notificationStore.subscribe((value) => {
		open = value.menuOpen;
		email = value.email;

		discord = value.discord;
		browser = value.browser;
	});

	// suscribed to session store since we need to hydrate the session after a successful approval from metamask
	session.subscribe(() => {});

	const handleClose = () => {
		notificationStore.toggleNotificationMenu(false);
	};

	const handleBrowser = () => {
		browser = !browser;
	};

	const handleActivateEmail = () => {
		showEmail = !showEmail;
	};

	const handleActivateDiscord = () => {
		showDiscord = !showDiscord;
	};


	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		const { signature, address } = await notificationStore.approveNotifications();

		const emailNotif = showEmail ? email : ''
		const discordNotif = showDiscord ? discord : ''

		if (signature) {
			email = emailNotif
			discord = discordNotif
			const res = await fetch('/api/notification-target', {
				method: 'POST',
				body: JSON.stringify({ email: emailNotif, discord: discordNotif, signature, address, browser })
			});
			const data = await res.json();
			session.update((s) => ({ ...s, notifications: data[0] }));
		}
		handleClose();
	};

	const discordPattern = '^.{3,32}#[0-9]{4}$';

	$: {
		showEmail = email?.length > 0;
		showDiscord = discord?.length > 0;
	}
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
									<div class="h-7 flex flex-row justify-end">
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
									<div class="flex items-center justify-between mt-8">
										<h2 class="text-4xl font-light" id="slide-over-title">Notifications</h2>
									</div>
									<div class="mt-1">
										<p class="text-sm">
											Stay up to date with with jackpot announcements and news!
										</p>
									</div>
								</div>
								<div class="flex-1 flex flex-col justify-between">
									<div class="px-4 divide-y divide-gray-200 sm:px-6">
										<div class="space-y-10 pt-6 pb-5">

											<div class="flex items-center justify-between">
												<span class="flex-grow flex flex-col">
													<span class="text-sm font-medium text-gray-900" id="availability-label"
														>Email</span
													>
												</span>
												<Switch active={showEmail} on:click={handleActivateEmail} />
											</div>
											{#if showEmail}
												<div class="mt-1">
													<input
														bind:value={email}
														type="text"
														name="email"
														id="email"
														required
														placeholder="avalotto@email.com"
														class="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
													/>
												</div>
											{/if}


											<div class="flex items-center justify-between">
												<span class="flex-grow flex flex-col">
													<span class="text-sm font-medium text-gray-900" id="availability-label"
														>Discord</span
													>
												</span>
												<Switch active={showDiscord} on:click={handleActivateDiscord} />
											</div>
											{#if showDiscord}
												<div class="mt-1">
														<input
															bind:value={discord}
															type="text"
															name="discord"
															id="discord"
															required
															pattern={discordPattern}
															placeholder="user#1234"
															class="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
														/>
												</div>
											{/if}
											<div class="flex items-center justify-between">
												<span class="flex-grow flex flex-col">
													<span class="text-sm font-medium text-gray-900" id="availability-label"
														>Browser Notifications</span
													>
												</span>
												<Switch active={browser} on:click={handleBrowser} />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="flex-shrink-0 px-4 py-4 flex justify-center space-x-6">
								<button
									type="button"
									on:click={handleClose}
									class="w-40  rounded text-indigo-500 border-indigo-500 border-2 h-12"
								>
									Cancel
								</button>
								<button
									type="submit"
									class="w-40 bg-indigo-500 text-white rounded"
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
