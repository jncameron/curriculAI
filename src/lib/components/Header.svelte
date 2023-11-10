<script lang="ts">
	import { GoogleAuthProvider, signInWithPopup, signOut, type Auth } from 'firebase/auth';
	import { auth, user } from '$lib/firebase';

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
		class="sticky h-18 inset-x-0 top-0 z-30 border-b border-gray-300 backdrop-blur-lg max-width-xl"
	>
		<div class="p-6 flex h-20 items-center justify-between border-b border-zinc-200">
			<a class="flex z-40 font-semibold btn btn-primary" href="/">
				<span>PeltA</span>
			</a>

			<div class="hidden items-center space-x-4 sm:flex">
				{#if $user}
					<a class="btn btn-glass" href="/dashboard"> Dashboard </a>
					<button class="btn btn-glass btn-primary" on:click={signOutUser}> Sign out </button>
				{:else}
					<button class="btn btn-outline"> Pricing </button>
					<button class="btn btn-outline btn-info" on:click={signInWithGoogle}> Sign in </button>
				{/if}
			</div>
		</div>
	</nav>
</header>
