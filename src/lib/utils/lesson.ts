export class Lesson {
	lessonLevel: string;
	classType: string;
	lessonType: string;
	lessonTitle: string;
	lessonId: string;
	inputText: string;
	lessonPlan: string;
	constructor(
		lessonLevel: string,
		classType: string,
		lessonType: string,
		lessonTitle: string,
		lessonId: string,
		inputText: string,
		lessonPlan: string
	) {
		this.lessonLevel = lessonLevel;
		this.classType = classType;
		this.lessonType = lessonType;
		this.lessonTitle = lessonTitle;
		this.lessonId = lessonId;
		this.inputText = inputText;
		this.lessonPlan = lessonPlan;
	}
}
