<script lang="ts">
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import Header from '$lib/components/Header.svelte';

	import { v4 as uuidv4 } from 'uuid';

	export let data;
	console.log('data', data);

	const lessonId = uuidv4();
</script>

<div class="grid h-full items-center grid-rows-2 mx-auto my-auto border border-primary">
	<div class="w-full h-full flex border border-primary">
		<a
			class="text-sm lg:text-lg mx-auto btn btn-primary w-1/6 my-auto"
			href="/dashboard/{lessonId}"
		>
			Create Lesson
		</a>
	</div>
	{#await data.lessons}
		<div>...loading</div>
	{:then lessons}
		<div class="w-full h-full flex border border-primary">
			{#each lessons as lesson}
				<a
					class="text-sm lg:text-md mx-auto btn btn-secondary w-1/6 my-auto"
					href="/dashboard/{lesson.lessonId}"
				>
					{lesson.lessonTitle || 'Untitled'}
				</a>
			{/each}
		</div>
	{/await}
</div>
