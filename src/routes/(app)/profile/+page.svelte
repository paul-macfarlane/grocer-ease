<script lang="ts">
	import { enhance } from '$app/forms';
	import { parseUpdateUserForm, type UpdateUserValidationErrors } from '$lib/validators/users';
	import type { SubmitFunction } from './$types';
	import { fade } from 'svelte/transition';

	let { data } = $props();

	let validationErrors: UpdateUserValidationErrors | undefined = $state(undefined);
	let submitError: string | undefined = $state(undefined);
	let toastMessage: string | undefined = $state(undefined);

	function toast(message: string) {
		toastMessage = message;
		setTimeout(() => {
			toastMessage = undefined;
		}, 1500);
	}

	const submit: SubmitFunction = ({ formData, cancel }) => {
		const parseUpdateRes = parseUpdateUserForm(formData);
		if (parseUpdateRes.errors) {
			validationErrors = parseUpdateRes.errors;
			cancel();
		}

		return async ({ result }) => {
			switch (result.type) {
				case 'redirect':
					validationErrors = undefined;
					submitError = '';
					break;

				case 'error':
					validationErrors = undefined;
					submitError = 'An unexpected error occurred';
					break;

				case 'success':
					validationErrors = undefined;
					submitError = '';
					toast('Profile Saved');
					break;

				case 'failure':
					if (result.status === 400) {
						validationErrors = result.data!.validationErrors;
						submitError = '';
					} else {
						validationErrors = undefined;
						submitError = 'An unexpected error occurred';
					}
					break;
			}
		};
	};
</script>

<main class="w-full">
	<form
		method="POST"
		use:enhance={submit}
		class="flex flex-col justify-center items-center gap-4 p-4"
	>
		<h1 class="text-3xl">Edit Profile</h1>

		{#if submitError}
			<p class="text-sm text-error">{submitError}</p>
		{/if}

		{#if validationErrors?.username}
			<p class="text-sm text-error">Username {validationErrors.username}</p>
		{/if}
		<label class="input input-bordered input-primary flex items-center gap-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 16 16"
				fill="currentColor"
				class="h-4 w-4 opacity-70"
			>
				<path
					d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
				/>
			</svg>
			<input
				name="username"
				type="text"
				class="grow"
				placeholder="Username"
				value={data.user.username}
			/>
		</label>

		<button class="btn btn-primary">Save</button>
	</form>
</main>

{#if toastMessage}
	<div class="toast" transition:fade={{ delay: 250, duration: 300 }}>
		<div class="alert bg-primary block">
			<span>{toastMessage}</span>
		</div>
	</div>
{/if}
