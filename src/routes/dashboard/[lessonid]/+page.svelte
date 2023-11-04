<script lang="ts">
	import { LessonLevel } from '$lib/utils/lessonLevel';
	import { ClassType } from '$lib/utils/classType';
	import type { PageData } from './$types';
	import { LessonType } from '$lib/utils/lessonType';
	import { Firestore, doc, setDoc, getDoc, DocumentReference } from 'firebase/firestore';
	import { db, auth } from '$lib/firebase';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import type { User } from 'firebase/auth';

	//export let data: PageData;
	let checked: boolean = false;
	let lessonLevel: string = '';
	let classType: string = '';
	let lessonType: string = '';
	let lessonTitle: string = '';
	let inputText: string = '';
	let user: User;
	export let data;
	console.log('data', data.lessonid);

	auth.onAuthStateChanged((firebaseUser) => {
		if (firebaseUser) {
			user = firebaseUser;
			getLesson(user);
		}
	});

	async function getLesson(user: User) {
		//user = doc(db, 'users', userId);
		const lesson = await doc(db, 'users', user.uid, 'lessons', data.lessonid);
		const docSnap = await getDoc(lesson);
		if (docSnap.exists()) {
			const docData = await docSnap.data();
			lessonLevel = docData.lessonLevel;
			classType = docData.classType;
			lessonType = docData.lessonType;
			lessonTitle = docData.lessonTitle;
			inputText = docData.inputText;
		} else {
			console.log('Document not found');
		}
		console.log('Document data:', docSnap.data());
	}

	const generateLesson = async () => {
		await setDoc(doc(db, 'users', user.uid, 'lessons', data.lessonid), {
			classType: classType,
			lessonType: lessonType,
			lessonTitle: lessonTitle,
			lessonLevel: lessonLevel,
			inputText: inputText
		});
		console.log('lesson inputs saved');
	};

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

<AuthCheck>
	<div
		class="md:p-4 grid lg:grid-cols-2 lg:grid-rows-[auto,auto] gap-4 grid-cols-1 grid-rows-1 border border-gray-200 h-[100%]"
	>
		<div class="bg-grey-100">
			<div class="join join-vertical w-full">
				<h1 class="flex max-w-4xl text-2xl font-bold md:text-2xl lg:text-3xl pb-4">
					Lesson Inputs
				</h1>
				<div class="collapse collapse-arrow join-item border border-base-300">
					<input type="checkbox" name="my-accordion-4" {checked} />
					<div class="collapse-title collapse-close text-xl font-medium">
						Lesson Title: {#if lessonTitle?.length > 0}
							<span class="text-secondary float-right">{lessonTitle}</span>
						{:else}
							<p class="text-error float-right">not entered</p>
						{/if}
					</div>
					<div class="collapse-content">
						<input
							bind:value={lessonTitle}
							class="textarea textarea-bordered textarea-primary w-full resize-none"
							placeholder="Paste your Input Material Text here..."
						/>
					</div>
				</div>
				<div class="collapse collapse-arrow join-item border border-base-300">
					<input type="radio" name="my-accordion-4" {checked} />
					<div class="collapse-title collapse-close text-xl font-medium">
						Lesson Level: {#if lessonLevel?.length > 0}
							<span class="text-secondary float-right">{lessonLevel}</span>
						{:else}
							<span class="text-error float-right">not selected</span>
						{/if}
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
						Class Type: {#if classType?.length > 0}
							<span class="text-secondary float-right">{classType}</span>
						{:else}
							<span class="text-error float-right">not selected</span>
						{/if}
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
						Lesson Type: {#if lessonType?.length > 0}
							<span class="text-secondary float-right">{lessonType}</span>
						{:else}
							<span class="text-error float-right">not selected</span>
						{/if}
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
					<div class="collapse-title collapse-close text-xl font-medium">
						Input Materials: {#if inputText?.length > 0}
							<p class="text text-secondary line-clamp-2 text-sm">
								{inputText}
							</p>
						{:else}
							<p class="text-error float-right">not entered</p>
						{/if}
					</div>
					<div class="collapse-content">
						<textarea
							bind:value={inputText}
							class="textarea textarea-bordered textarea-primary w-full resize-none"
							placeholder="Paste your Input Material Text here..."
							rows="8"
						/>
					</div>
				</div>
			</div>
			<div class="flex justify-center pt-4">
				<button
					class="btn btn-primary mx-auto items-center justify-center"
					on:click={generateLesson}>Generate Lesson</button
				>
			</div>
		</div>
		<div class="border-b border-gray-200 row-span-2"><p>Lesson Outputs</p></div>

		<div class="flex flex-col"><p>Chat to Tweak</p></div>
	</div>
</AuthCheck>
