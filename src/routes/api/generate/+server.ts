import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { OPENAI_API_KEY } from '$env/static/private';

export const POST: RequestHandler = async (event) => {
	const body = await event.request.json();
	console.log('the request body', body);

	const lessonPlanReq = ` You will help me create a lesson plan for an adult ESL class with the folowing information:
	Lesson Type: ${body.lessonType}
	Class Type: ${body.classType}
	Level: ${body.lessonLevel}
	Lesson Title: ${body.lessonTitle}
	Input Materials: ${body.inputText}

	the "Input Materials" section will contain an actual text, for example from a newspaper. If the level of the text is too difficult
	for the student level (for example, an Intermediate General English class), you need to create a version of the text that is easier to understand.	
	Include that version in the lesson plan you create.
	The lesson plan generated needs to be marked-up with HTML tags, so that it can be displayed on a web page.

	`;

	const lessonPlan = await callOpenAI(lessonPlanReq);
	return json({ lessonPlan: lessonPlan });
};

async function callOpenAI(lessonPlanReq: string) {
	const options = {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${OPENAI_API_KEY}`,
			'Content-Type': 'application/json'
		},

		body: JSON.stringify({
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: lessonPlanReq }]
		})
	};
	try {
		const response = await fetch('https://api.openai.com/v1/chat/completions', options);
		const data = await response.json();
		console.log('the response from openai', data);
		return data.choices[0].message;
	} catch (error) {
		console.log('the error', error);
	}
}
