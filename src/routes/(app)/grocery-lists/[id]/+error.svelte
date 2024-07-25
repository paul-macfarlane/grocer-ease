<script lang="ts">
	import { page } from '$app/stores';
</script>

<main class="flex flex-col justify-center items-center w-full h-full gap-4">
	{#if $page.status === 403}
		<h1 class="text-3xl">Permission Denied</h1>
		<p>You don't have access to this Grocery List</p>
	{:else if $page.status === 404}
		<h1 class="text-3xl">Grocer List Not Found</h1>
	{:else}
		<h1 class="text-3xl">An Unexpected Error Occurred</h1>
	{/if}

	<a class="btn btn-primary" href="/" color="primary">Return to Grocery Lists</a>
</main>
