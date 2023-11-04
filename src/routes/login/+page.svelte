<script lang="ts">
	import type { PageData } from './$types';
	import { GoogleAuthProvider, signInWithPopup, signOut, type Auth } from 'firebase/auth';
	import { auth, user } from '$lib/firebase';
	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();

		const user = await signInWithPopup(auth, provider);
		console.log(user);
	}
	export let data: PageData;
</script>

<button class="btn btn-ghost" on:click={signInWithGoogle}> Sign in </button>
