<script lang="ts">
	import type { LayoutData } from './$types';
	import '../app.css';
	import { onMount } from 'svelte';
	import Header from '../lib/components/Header.svelte';
	import type { analytics } from '$lib/firebase';

	let user: any;
	let userData: any;
	onMount(() => {
		import('$lib/firebase').then((module) => {
			const user = module.user;
			const userData = module.userData;
		});
		$userData;
		$user;
	});

	export let data: LayoutData;
</script>

<div class="app">
	<main>
		<Header />
		<slot />
	</main>
</div>
