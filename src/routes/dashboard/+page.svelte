<script lang="ts">
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import Header from '$lib/components/Header.svelte';
	import type { LessonInputs } from '$lib/utils/lesson';
	import { onMount } from 'svelte';
	import {
		Firestore,
		doc,
		setDoc,
		getDoc,
		DocumentReference,
		collection,
		getDocs
	} from 'firebase/firestore';
	import type { User } from 'firebase/auth';
	import { v4 as uuidv4 } from 'uuid';
	import { auth, db } from '$lib/firebase';

	let user: User;
	let lessons: LessonInputs[] = [];

	onMount(async () => {
		await auth.onAuthStateChanged((firebaseUser) => {
			if (firebaseUser) {
				user = firebaseUser;
				getLessons(user);
				console.log(lessons);
			}
		});
	});

	async function getLessons(user: User) {
		const lessonsCollectionRef = collection(db, 'users', user.uid, 'lessons');
		const querySnapshot = await getDocs(lessonsCollectionRef);
		querySnapshot.forEach((doc) => {
			const data = doc.data();
			const lesson: LessonInputs = {
				lessonId: doc.id,
				lessonLevel: data.lessonLevel,
				classType: data.classType,
				lessonType: data.lessonType,
				lessonTitle: data.lessonTitle,
				inputText: data.inputText
			};
			const exists = lessons.some((existingLesson) => existingLesson.lessonId === lesson.lessonId);
			if (!exists) {
				lessons = [...lessons, lesson];
				//lessons.push(lesson);
			}
		});
	}
	const lessonId = uuidv4();
</script>

<div class="grid h-full items-center grid-rows-3 mx-auto my-auto flex flex-auto">
	<div class="w-full h-full flex border-b border-primary">
		<a
			class="text-sm lg:text-lg mx-auto btn btn-primary w-1/6 my-auto"
			href="/dashboard/{lessonId}"
		>
			Create Lesson
		</a>
	</div>

	{#if lessons.length > 0}
		<div class="h-full">
			<div
				class="p-4 w-full grid grid-flow-row-dense row-span-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4"
			>
				{#each lessons as lesson}
					<div class="card lg:card-side bg-violet-200 shadow-xl justify-start items-start w-full">
						<a href="/dashboard/{lesson.lessonId}">
							<div class="card-body justify-start items-start w-full">
								<h2 class="card-title text-slate-600 line-clamp-1">
									{lesson.lessonTitle || 'Untitled'}
								</h2>
								<ul>
									<li>{lesson.classType}</li>
									<li>{lesson.lessonLevel}</li>
									<li>{lesson.lessonType}</li>
								</ul>
							</div>
						</a>
					</div>
				{/each}
			</div>
		</div>
	{:else}
		loading
	{/if}
</div>
