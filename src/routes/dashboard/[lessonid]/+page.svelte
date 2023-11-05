<script lang="ts">
	import { LessonLevel } from '$lib/utils/lessonLevel';
	import { ClassType } from '$lib/utils/classType';
	import type { PageData } from './$types';
	import { LessonType } from '$lib/utils/lessonType';
	import { Firestore, doc, setDoc, getDoc, DocumentReference } from 'firebase/firestore';
	import { db, auth } from '$lib/firebase';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import type { User } from 'firebase/auth';
	import type { LessonInputs } from '$lib/utils/lesson';

	//export let data: PageData;
	let checked: boolean = false;
	let lessonLevel: string = '';
	let classType: string = '';
	let lessonType: string = '';
	let lessonTitle: string = '';
	let inputText: string = '';
	let user: User;
	let lessonPlan: string = '';
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
		const lessonInputs: LessonInputs = {
			lessonId: data.lessonid,
			lessonLevel,
			classType,
			lessonType,
			lessonTitle,
			inputText
		};
		await setDoc(doc(db, 'users', user.uid, 'lessons', data.lessonid), {
			lessonLevel: lessonLevel,
			classType: classType,
			lessonType: lessonType,
			lessonTitle: lessonTitle,
			inputText: inputText
		});
		console.log('lesson inputs saved');

		const generate = async () => {
			const res = await fetch('/api/generate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(lessonInputs)
			});
			lessonPlan = await res.text();
		};
		generate();
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
		class="md:p-4 grid xl:grid-cols-3 lg:grid-cols-2 lg:grid-rows-[auto,auto] gap-4 grid-cols-1 grid-rows-1 border border-gray-200 h-[100%]"
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
							<span class="text-secondary float-right line-clamp-1">{lessonTitle}</span>
						{:else}
							<p class="text-error float-right">not entered</p>
						{/if}
					</div>
					<div class="collapse-content">
						<input
							bind:value={lessonTitle}
							class="textarea textarea-bordered textarea-primary w-full resize-none"
							placeholder="Enter your lesson title..."
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
		<div class="border-b border-gray-200 row-span-2 xl:col-span-2">
			<p>Lesson Outputs</p>
			<div>{lessonPlan}</div>
			<h1>Adult ESL Lesson Plan - Reading</h1>
			\n\t
			<h2>Lesson Type: Reading</h2>
			\n\t
			<h2>Class Type: General English</h2>
			\n\t
			<h2>Level: Intermediate</h2>
			\n\t
			<h2>Lesson Title: The Football Match is a great day out for everyone</h2>
			\n\n\t
			<h3>Input Materials</h3>
			\n\t
			<p>
				Watching live football is a great way to enjoy the sport as a family. It may be difficult
				for many people to afford attending a Premier League game as a family of four, but there are
				other options available. Many lower league clubs have started offering more affordable
				prices for families to attend their games. Some clubs provide family tickets, while others
				offer discounted or even free entry for kids. Even England games at Wembley Stadium have
				become more affordable, with the creation of a family zone when the national team plays at
				home.
			</p>
			\n\n\t
			<p>
				The Women's Super League (WSL) is another great option for families. All games in the WSL
				provide a family-friendly environment, cost-friendly tickets, and the opportunity to see top
				teams like Chelsea, Arsenal, Manchester City, and other world-class teams. Players in the
				WSL are also known to spend time after games taking selfies and signing autographs for kids,
				making the experience even more memorable.
			</p>
			\n\n\t
			<p>
				Attending a live football game creates a thrilling atmosphere, whether it's a high-profile
				match like the North London derby at the Emirates Stadium or a non-league game. Take a look
				at the options available in your local area, choose a club that suits your needs, and have a
				great time!
			</p>
			\n\n\t
			<hr />
			\n\n\t
			<h3>Pre-Reading Activities</h3>
			\n\t
			<ul>
				\n\t\t
				<li>
					Review any vocabulary related to football, such as \"Premier League,\" \"Wembley
					Stadium,\" \"non-league,\" etc.
				</li>
				\n\t\t
				<li>
					Discuss with the students their experience with football games and if they have ever
					attended one as a family.
				</li>
				\n\t\t
				<li>
					Introduce the concept of family-friendly events and ask the students if they know any
					other examples.
				</li>
				\n\t
			</ul>
			\n\n\t
			<h3>While-Reading Activities</h3>
			\n\t
			<ul>
				\n\t\t
				<li>Provide the students with a copy of the simplified version of the text.</li>
				\n\t\t
				<li>Read the text aloud and have the students follow along.</li>
				\n\t\t
				<li>
					Ask comprehension questions to check understanding, such as:\n\t\t\t
					<ul>
						\n\t\t\t\t
						<li>What are some ways in which families can enjoy live football?</li>
						\n\t\t\t\t
						<li>Why are lower league clubs a more affordable option for families?</li>
						\n\t\t\t\t
						<li>What does the Women's Super League offer to families?</li>
						\n\t\t\t\t
						<li>Why is attending a live game exciting?</li>
						\n\t\t\t
					</ul>
					\n\t\t
				</li>
				\n\t
			</ul>
			\n\n\t
			<h3>Post-Reading Activities</h3>
			\n\t
			<ul>
				\n\t\t
				<li>
					Have a group discussion about the benefits of attending a live football game as a family.
				</li>
				\n\t\t
				<li>
					Ask the students if they would like to attend a football game as a family and encourage
					them to share their preferences.
				</li>
				\n\t\t
				<li>
					Assign a writing task where students write about their ideal family day out at a football
					match.
				</li>
				\n\t\t
				<li>
					If possible, show the students images or videos of football games to further engage their
					interest.
				</li>
				\n\t
			</ul>
			\n\n
		</div>

		<div class="flex flex-col"><p>Chat to Tweak</p></div>
	</div>
</AuthCheck>
