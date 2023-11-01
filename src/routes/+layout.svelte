<script lang="ts">
	import type { LayoutData } from './$types';
	import '../app.css';
	import Header from '../lib/components/Header.svelte';

	export let data: LayoutData;
</script>

<div class="app">
	<main>
		<Header />
		<slot />
	</main>
</div>
