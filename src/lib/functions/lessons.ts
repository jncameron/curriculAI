import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { db } from '../firebase';
import type { Lesson } from '$lib/utils/lesson';

export async function getLessons(user: User, lessons: Lesson[]) {
	const lessonsCollectionRef = collection(db, 'users', user.uid, 'lessons');
	const querySnapshot = await getDocs(lessonsCollectionRef);
	querySnapshot.forEach((doc) => {
		const data = doc.data();
		const lesson: Lesson = {
			lessonId: doc.id,
			lessonLevel: data.lessonLevel,
			classType: data.classType,
			lessonType: data.lessonType,
			lessonTitle: data.lessonTitle,
			inputText: data.inputText,
			lessonPlan: data.lessonPlan
		};
		const exists = lessons.some((existingLesson) => existingLesson.lessonId === lesson.lessonId);
		if (!exists) {
			lessons = [...lessons, lesson];
		}
	});
	return lessons;
}

export async function deleteLesson(user: User, lessonId: string) {
	await deleteDoc(doc(db, 'users', user.uid, 'lessons', lessonId));
	return false;
}
