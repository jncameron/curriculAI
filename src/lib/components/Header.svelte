<script lang="ts">
	import { GoogleAuthProvider, signInWithPopup, signOut, type Auth } from 'firebase/auth';
	import { onMount } from 'svelte';
	let auth: Auth;
	let user;

	onMount(() => {
		import(`$lib/firebase`).then((module) => {
			auth = module.auth;
			user = module.user;
		});
	});

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();

		const user = await signInWithPopup(auth, provider);
		console.log(user);
	}

	async function signOutUser() {
		const provider = new GoogleAuthProvider();

		const user = await signOut(auth);
		console.log(user);
	}
</script>

<header>
	<nav
		class="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all"
	>
		<div class="p-6 flex h-14 items-center justify-between border-b border-zinc-200">
			<a class="flex z-40 font-semibold btn btn-primary" href="/">
				<span>PeltA</span>
			</a>

			<div class="hidden items-center space-x-4 sm:flex">
				{#if $user}
					<button class="btn btn-ghost" on:click={signOutUser}> Sign out </button>
				{:else}
					<button class="btn btn-ghost"> Pricing </button>
					<button class="btn btn-ghost" on:click={signInWithGoogle}> Sign in </button>
				{/if}
				<a class="btn btn-ghost" href="/dashboard"> Dashboard </a>
			</div>
		</div>
	</nav>
</header>
