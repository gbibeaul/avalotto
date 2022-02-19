<script>
	function handleRevealYourPrizeClick() {
		console.log('handleRevealYourPrizeClick');
	}

	// Disable the submit button if there are any un-scratched numbers.
	$: submitButtonDisabled = true; //currentTicket?.numbers?.some(({ scratched }) => !scratched);
</script>

<div id="footer" class="flex self-center justify-self-end mt-auto mb-4">
	<button
		class="border-solid rounded-md border-4 border-black py-4 px-12 z-10 disabled:opacity-30 reveal-your-prize-btn"
		type="submit"
		on:click={handleRevealYourPrizeClick}
		disabled={submitButtonDisabled}
	>
		<div class="font-bold">REVEAL YOUR PRIZE</div>
	</button>
</div>

<style>
	.reveal-your-prize-btn {
		background: linear-gradient(180deg, #f7da10 0%, #ffb900 100%);
	}
</style>
