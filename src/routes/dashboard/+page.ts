import type { PageLoad } from './$types';
import { db, auth } from '$lib/firebase';

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

let lessons: LessonInfo[] = [];
let user: User;

export const load = (async () => {
	await auth.onAuthStateChanged((firebaseUser) => {
		if (firebaseUser) {
			user = firebaseUser;
			getLessons(firebaseUser);
		}
	});

	if (auth.currentUser) {
		//	getLessons(user);
	}

	return {
		lessons
	};
}) satisfies PageLoad;

async function getLessons(user: User) {
	const lessonsCollectionRef = collection(db, 'users', user.uid, 'lessons');
	const querySnapshot = await getDocs(lessonsCollectionRef);

	await querySnapshot.forEach((doc) => {
		const data = doc.data();
		const lesson = new LessonInfo(
			data.lessonLevel,
			data.classType,
			data.lessonType,
			data.lessonTitle,
			doc.id
		);
		const exists = lessons.some((existingLesson) => existingLesson.lessonId === lesson.lessonId);
		if (!exists) {
			lessons.push(lesson);
		}
	});
	console.log('lessons', lessons);
}

class LessonInfo {
	lessonLevel: string;
	classType: string;
	lessonType: string;
	lessonTitle: string;
	lessonId: string;
	constructor(
		lessonLevel: string,
		classType: string,
		lessonType: string,
		lessonTitle: string,
		lessonId: string
	) {
		this.lessonLevel = lessonLevel;
		this.classType = classType;
		this.lessonType = lessonType;
		this.lessonTitle = lessonTitle;
		this.lessonId = lessonId;
	}
}
