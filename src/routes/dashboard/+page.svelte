<script lang="ts">
	import { LessonLevel } from '$lib/utils/lessonLevel';
	import type { PageData } from './$types';

	export let data: PageData;
	let checked: boolean = true;
	let lessonLevel: string = 'Beginner';

	function changeLessonLevel(e: Event) {
		checked = true;
		checked = false;
		lessonLevel = e.target?.value;
	}

	function changeChecked() {
		checked = !checked;
		return checked;
	}
</script>

<div
	class="p-4 grid lg:grid-cols-2 lg:grid-rows-2 gap-4 md:grid-cols-1 md:grid-rows-1 border border-gray-200 h-[100%]"
>
	<div class="bg-sky-200">
		<div class="join join-vertical w-full">
			<div class="collapse collapse-arrow join-item border border-base-300">
				<input type="radio" name="my-accordion-4" {checked} />
				<div class="collapse-title collapse-close text-xl font-medium">
					Lesson Level: {lessonLevel}
				</div>
				<div class="collapse-content">
					<button
						value={LessonLevel.BEGINNER}
						on:click={changeLessonLevel}
						class="btn btn-ghost w-[100%] md:w-2/5">{LessonLevel.BEGINNER}</button
					>
					<button
						value={LessonLevel.PREINTERMEDIATE}
						on:click={changeLessonLevel}
						class="btn btn-ghost w-[100%] md:w-2/5">{LessonLevel.PREINTERMEDIATE}</button
					>
					<button
						value={LessonLevel.INTERMEDIATE}
						on:click={changeLessonLevel}
						class="btn btn-ghost w-[100%] md:w-2/5">{LessonLevel.INTERMEDIATE}</button
					>
					<button
						value={LessonLevel.UPPERINTERMEDIATE}
						on:click={changeLessonLevel}
						class="btn btn-ghost w-[100%] md:w-2/5">{LessonLevel.UPPERINTERMEDIATE}</button
					>
					<button
						value={LessonLevel.ADVANCED}
						on:click={changeLessonLevel}
						class="btn btn-ghost w-[100%] md:w-2/5">{LessonLevel.ADVANCED}</button
					>
				</div>
			</div>

			<div class="collapse collapse-arrow join-item border border-base-300">
				<input type="radio" name="my-accordion-4" />
				<div class="collapse-title text-xl font-medium">
					Click to open this one and close others
				</div>
				<div class="collapse-content">
					<p>hello</p>
				</div>
			</div>
			<div class="collapse collapse-arrow join-item border border-base-300">
				<input type="radio" name="my-accordion-4" />
				<div class="collapse-title text-xl font-medium">
					Click to open this one and close others
				</div>
				<div class="collapse-content">
					<p>hello</p>
				</div>
			</div>
			<div class="collapse bg-base-200">
				<input type="checkbox" />
				<div class="collapse-title text-xl font-medium">Lesson Level: {lessonLevel}</div>
				<div class="collapse-content">
					<button
						value={LessonLevel.BEGINNER}
						on:click={changeLessonLevel}
						class="btn btn-ghost w-[100%] md:w-2/5">{LessonLevel.BEGINNER}</button
					>
					<button
						value={LessonLevel.PREINTERMEDIATE}
						on:click={changeLessonLevel}
						class="btn btn-ghost w-[100%] md:w-2/5">{LessonLevel.PREINTERMEDIATE}</button
					>
					<button
						value={LessonLevel.INTERMEDIATE}
						on:click={changeLessonLevel}
						class="btn btn-ghost w-[100%] md:w-2/5">{LessonLevel.INTERMEDIATE}</button
					>
					<button
						value={LessonLevel.UPPERINTERMEDIATE}
						on:click={changeLessonLevel}
						class="btn btn-ghost w-[100%] md:w-2/5">{LessonLevel.UPPERINTERMEDIATE}</button
					>
					<button
						value={LessonLevel.ADVANCED}
						on:click={changeLessonLevel}
						class="btn btn-ghost w-[100%] md:w-2/5">{LessonLevel.ADVANCED}</button
					>
				</div>
			</div>
		</div>
	</div>
	<div class="border-b border-gray-200 row-span-2"><p>Lesson Outputs</p></div>

	<div class="row-span-2"><p>Chat to Tweak</p></div>
</div>
