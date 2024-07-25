<script lang="ts">
	import { page } from '$app/stores';
</script>

<main class="flex flex-col justify-center items-center w-full h-full gap-4">
	{#if $page.status === 404}
		<h1 class="text-3xl">Page Not Found</h1>
	{:else}
		<h1 class="text-3xl">An Unexpected Error Occurred</h1>
	{/if}

	<a class="btn btn-primary" href="/" color="primary">Return to home</a>
</main>
