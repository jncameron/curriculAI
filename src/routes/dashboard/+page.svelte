<script lang="ts">
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import Header from '$lib/components/Header.svelte';
	import type { Lesson } from '$lib/utils/lesson';
	import { onMount } from 'svelte';
	import {
		Firestore,
		doc,
		setDoc,
		getDoc,
		DocumentReference,
		collection,
		getDocs,
		deleteDoc
	} from 'firebase/firestore';
	import type { User } from 'firebase/auth';
	import { v4 as uuidv4 } from 'uuid';
	import { auth, db } from '$lib/firebase';
	import { Trash } from 'lucide-svelte';
	import { deleteLesson, getLessons } from '$lib/functions/lessons';
	let apiKey = 'vvnpqrv0imxp0leetujd83xl0inhtp5nvizxdl5coqux458o';
	let isModalOpen = false;
	let user: User;
	let lessons: Lesson[] = [];
	$: lessons;

	onMount(async () => {
		await auth.onAuthStateChanged((firebaseUser) => {
			if (firebaseUser) {
				user = firebaseUser;

				console.log(lessons);
			}
		});
		lessons = await getLessons(user, lessons);
	});

	const lessonId = uuidv4();
</script>

<div class=" grid h-full items-center grid-rows-[auto,auto] mx-auto flex-auto max-w-screen-2xl">
	<div class="w-full h-full flex border-b border-primary my-auto py-10" id="create-lesson">
		<a class="text-sm lg:text-lg mx-auto my-auto btn btn-primary" href="/dashboard/{lessonId}">
			Create Lesson
		</a>
	</div>

	{#if lessons.length > 0}
		<div class="h-full">
			<div
				class="p-4 w-full grid grid-flow-row-dense row-span-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
			>
				{#each lessons as lesson}
					<div
						class="card lg:card-side bg-white-500 shadow-xl justify-start items-start w-full border relative"
					>
						<div class="card-body justify-start items-start w-full">
							<a href="/dashboard/{lesson.lessonId}">
								<h2 class="card-title text-slate-600 line-clamp-1">
									{lesson.lessonTitle || 'Untitled'}
								</h2>
								<ul>
									{#if lesson.classType}
										<li class="badge badge-outline badge-accent line-clamp-1 mb-2">
											{lesson.classType}
										</li>
									{/if}
									{#if lesson.lessonLevel}
										<li class="badge badge-outline badge-accent line-clamp-1 mb-2">
											{lesson.lessonLevel}
										</li>
									{/if}
									{#if lesson.lessonType}
										<li class="badge badge-outline badge-accent line-clamp-1">
											{lesson.lessonType}
										</li>
									{/if}
								</ul>
							</a>
							<div class="card-actions justify-end absolute bottom-2 right-2">
								<div class="modal" class:modal-open={isModalOpen}>
									<div class="modal-box">
										<h3 class="font-bold text-lg">Delete {lesson.lessonTitle}</h3>
										<p class="py-4">Are you sure you want to delete this lesson?</p>
										<div class="modal-action">
											<!-- 🔵 set false on click -->
											<button class="btn" on:click={() => (isModalOpen = false)}>Cancel</button>
											<button
												class="btn btn-error"
												on:click={() => {
													deleteLesson(user, lesson.lessonId);
													isModalOpen = false;
												}}>Delete</button
											>
										</div>
									</div>
								</div>
								<button class="btn btn-primary" on:click={() => (isModalOpen = true)}
									><Trash /></button
								>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{:else}
		loading
	{/if}
</div>
