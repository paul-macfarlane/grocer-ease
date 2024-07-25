<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import addSvg from '$lib/assets/add.svg';
	import {
		parseCreateGroceryListForm,
		type ParseCreateGroceryListFormErrors
	} from '$lib/validators/groceryLists';
	import type { SubmitFunction } from './grocery-lists/$types';

	let newListFormValidationErrors: ParseCreateGroceryListFormErrors | undefined = $state(undefined);
	let newListFormSubmitError: string | undefined = $state(undefined);

	let newListDialog: HTMLDialogElement;
	function openNewListModal() {
		newListDialog.showModal();
	}

	const newListSubmit: SubmitFunction = ({ formData, cancel }) => {
		const parseCreateRes = parseCreateGroceryListForm(formData);
		if (parseCreateRes.errors) {
			newListFormValidationErrors = parseCreateRes.errors;
			cancel();
		}

		return async ({ result }) => {
			switch (result.type) {
				case 'redirect':
					newListFormValidationErrors = undefined;
					newListFormSubmitError = '';
					goto(result.location);
					break;

				case 'error':
					newListFormValidationErrors = undefined;
					newListFormSubmitError = 'An unexpected error occurred';
					break;

				case 'success':
					newListFormValidationErrors = undefined;
					newListFormSubmitError = '';
					break;

				case 'failure':
					if (result.status === 400) {
						newListFormValidationErrors = result.data!.validationErrors;
						newListFormSubmitError = '';
					} else {
						newListFormValidationErrors = undefined;
						newListFormSubmitError = 'An unexpected error occurred';
					}
					break;
			}
		};
	};
</script>

<main class="w-full flex flex-col justify-center items-center gap-4 p-4">
	<div class="flex justify-center items-center gap-4">
		<h1 class="text-3xl">My Lists</h1>
		<button onclick={openNewListModal} class="btn btn-square"
			><img alt="add grocery list" src={addSvg} /></button
		>
	</div>
</main>

<dialog bind:this={newListDialog} class="modal">
	<div class="modal-box space-y-4">
		<h3 class="text-lg font-bold">New Grocery List</h3>
		<form use:enhance={newListSubmit} id="new-list" method="POST" action="/grocery-lists">
			<div class="space-y-2">
				{#if newListFormSubmitError}
					<p class="text-sm text-error">{newListFormSubmitError}</p>
				{/if}

				{#if newListFormValidationErrors?.title}
					<p class="text-sm text-error">Title {newListFormValidationErrors.title}</p>
				{/if}
				<input
					name="title"
					type="text"
					placeholder="Type a title for your list"
					class="input input-bordered input-primary w-full max-w-xs"
				/>
			</div>
		</form>
		<div class="modal-action justify-between">
			<button class="btn btn-primary" form="new-list">Save</button>

			<form method="dialog">
				<button class="btn">Cancel</button>
			</form>
		</div>
	</div>
</dialog>
