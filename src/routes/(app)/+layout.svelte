<script lang="ts">
	let { children, data } = $props();

	const navItems = [
		{
			href: '/',
			name: 'Home'
		}
	];
</script>

<div class="navbar text-primary-content bg-primary sticky top-0">
	<div class="navbar-start">
		<div class="dropdown">
			<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/>
				</svg>
			</div>
			<ul
				class="menu menu-sm dropdown-content text-primary-content bg-primary rounded-box z-[1] mt-3 w-52 p-2 shadow"
			>
				{#each navItems as navItem (navItem.name)}
					<li><a href={navItem.href}>{navItem.name}</a></li>
				{/each}
			</ul>
		</div>
		<a href="/" class="btn btn-ghost text-xl">GrocerEase</a>
	</div>

	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			{#each navItems as navItem (navItem.name)}
				<li><a href={navItem.href}>{navItem.name}</a></li>
			{/each}
		</ul>
	</div>

	<div class="navbar-end">
		<div class="dropdown dropdown-end">
			{#if data.user.profilePicUrl}
				<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
					<div class="w-10 rounded-full">
						<img alt="profile" src={data.user.profilePicUrl} />
					</div>
				</div>
			{:else}
				<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar placeholder">
					<div class="w-10 rounded-full bg-neutral text-neutral-content">
						<span class="text-xl">{data.user.firstName[0] + data.user.lastName[0]}</span>
					</div>
				</div>
			{/if}

			<ul
				class="menu menu-sm dropdown-content text-primary-content bg-primary rounded-box z-[1] mt-3 w-52 p-2 shadow"
			>
				<li>
					<a href="/profile" class="justify-between"> Profile </a>
				</li>
				<li><a href="/auth/logout">Logout</a></li>
			</ul>
		</div>
	</div>
</div>

{@render children()}
