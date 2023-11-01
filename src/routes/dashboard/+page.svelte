<script lang="ts">
	import { LessonLevel } from '$lib/utils/lessonLevel';
	import { ClassType } from '$lib/utils/classType';
	import type { PageData } from './$types';
	import { LessonType } from '$lib/utils/lessonType';

	export let data: PageData;
	let checked: boolean = false;
	let lessonLevel: string = LessonLevel.INTERMEDIATE;
	let classType: string = ClassType.GEN;
	let lessonType: string = LessonType.READING;

	function changeLessonLevel(e: Event) {
		checked = true;
		checked = false;
		lessonLevel = (e.target as HTMLInputElement).value;
	}
	function changeClassType(e: Event) {
		checked = true;
		checked = false;
		classType = (e.target as HTMLInputElement).value;
	}
	function changeLessonType(e: Event) {
		checked = true;
		checked = false;
		lessonType = (e.target as HTMLInputElement).value;
	}

	function changeChecked() {
		console.log('changeChecked');
		checked = !checked;
		return checked;
	}
</script>

<div
	class="p-4 grid lg:grid-cols-2 lg:grid-rows-[auto,auto] gap-4 md:grid-cols-1 md:grid-rows-1 border border-gray-200 h-[100%]"
>
	<div class="bg-grey-100">
		<div class="join join-vertical w-full">
			<h1 class="flex max-w-4xl text-2xl font-bold md:text-3xl lg:text-4xl pb-4">Lesson Inputs</h1>
			<div class="collapse collapse-arrow join-item border border-base-300">
				<input type="radio" name="my-accordion-4" {checked} />
				<div class="collapse-title collapse-close text-xl font-medium">
					Lesson Level: <span class="text-secondary float-right">{lessonLevel}</span>
				</div>
				<div class="collapse-content">
					<button
						value={LessonLevel.BEGINNER}
						on:click={changeLessonLevel}
						class="btn btn-ghost w-[100%] md:w-[49%]">{LessonLevel.BEGINNER}</button
					>
					<button
						value={LessonLevel.PREINTERMEDIATE}
						on:click={changeLessonLevel}
						class="btn btn-ghost w-[100%] md:w-[49%]">{LessonLevel.PREINTERMEDIATE}</button
					>
					<button
						value={LessonLevel.INTERMEDIATE}
						on:click={changeLessonLevel}
						class="btn btn-ghost w-[100%] md:w-[49%]">{LessonLevel.INTERMEDIATE}</button
					>
					<button
						value={LessonLevel.UPPERINTERMEDIATE}
						on:click={changeLessonLevel}
						class="btn btn-ghost w-[100%] md:w-[49%]">{LessonLevel.UPPERINTERMEDIATE}</button
					>
					<button
						value={LessonLevel.ADVANCED}
						on:click={changeLessonLevel}
						class="btn btn-ghost w-[100%] md:w-[49%]">{LessonLevel.ADVANCED}</button
					>
				</div>
			</div>

			<div class="collapse collapse-arrow join-item border border-base-300">
				<input type="radio" name="my-accordion-4" {checked} />
				<div class="collapse-title collapse-close text-xl font-medium">
					Class Type: <span class="text-secondary float-right">{classType}</span>
				</div>
				<div class="collapse-content">
					<button
						value={ClassType.GEN}
						on:click={changeClassType}
						class="btn btn-ghost w-[100%] md:w-[49%]">{ClassType.GEN}</button
					>
					<button
						value={ClassType.IELTS}
						on:click={changeClassType}
						class="btn btn-ghost w-[100%] md:w-[49%]">{ClassType.IELTS}</button
					>
				</div>
			</div>
			<div class="collapse collapse-arrow join-item border border-base-300">
				<input type="radio" name="my-accordion-4" {checked} />
				<div class="collapse-title collapse-close text-xl font-medium">
					Lesson Type: <span class="text-secondary float-right">{lessonType}</span>
				</div>
				<div class="collapse-content">
					<button
						value={LessonType.READING}
						on:click={changeLessonType}
						class="btn btn-ghost w-[100%] md:w-[49%]">{LessonType.READING}</button
					>
					<button
						value={LessonType.WRITING}
						on:click={changeLessonType}
						class="btn btn-ghost w-[100%] md:w-[49%]">{LessonType.WRITING}</button
					>
					<button
						value={LessonType.LISTENING}
						on:click={changeLessonType}
						class="btn btn-ghost w-[100%] md:w-[49%]">{LessonType.LISTENING}</button
					>
					<button
						value={LessonType.SPEAKING}
						on:click={changeLessonType}
						class="btn btn-ghost w-[100%] md:w-[49%]">{LessonType.SPEAKING}</button
					>
				</div>
			</div>
			<div class="collapse collapse-arrow join-item border border-base-300">
				<input type="checkbox" name="my-accordion-4" {checked} />
				<div class="collapse-title collapse-close text-xl font-medium">Input Materials:</div>
				<div class="collapse-content">
					<textarea
						class="textarea textarea-bordered textarea-primary w-full"
						placeholder="Paste your Input Material Text here..."
						rows="8"
					/>
				</div>
			</div>
		</div>
		<div class="flex justify-center pt-4">
			<button class="btn btn-primary mx-auto items-center justify-center">Generate Lesson</button>
		</div>
	</div>
	<div class="border-b border-gray-200 row-span-2"><p>Lesson Outputs</p></div>

	<div class="flex flex-col"><p>Chat to Tweak</p></div>
</div>
