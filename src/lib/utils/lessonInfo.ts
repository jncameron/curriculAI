export class LessonInfo {
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
