<script context="module">
	import { parseISO } from 'date-fns';
	import { seo } from '../../stores/seo';

	import TicketReview from '../../components/lotto/TicketReview.svelte';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {
		const res = await fetch(`/api/get-ticket/${page.params.id}`, {
			method: 'GET'
		});

		if (res.ok) {
			const data = await res.json();
			const { numbers, wallet, createdAt } = data;

			seo.update(() => ({
				title: 'Ticket for Avvalotto',
				description: `Ticket played by ${wallet} for numbers ${numbers}`
			}));

			return {
				props: {
					ticket: {
						hash: page.params.id,
						numbers,
						wallet,
						createdAt: parseISO(createdAt)
					}
				}
			};
		}

		return {
			status: res.status,
			error: new Error(res.status === 404 ? 'Ticket not found' : 'Something went wrong')
		};
	}
</script>

<script lang="ts">
	export let ticket;
</script>

<div class="flex h-full justify-center items-center">
	<TicketReview
		hash={ticket.hash}
		wallet={ticket.wallet}
		plays={ticket.numbers}
		date={ticket.createdAt}
		isViewOnly
	/>
</div>
