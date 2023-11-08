import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { OPENAI_API_KEY } from '$env/static/private';
import { readinglessonPlanRequest } from '$lib/utils/openaiRequests/readingLessonRequest';

export const POST: RequestHandler = async (event) => {
	const body = await event.request.json();
	console.log('the request body', body);

	let lessonPlan;

	const lessonPlanReq = readinglessonPlanRequest(
		body.classType,
		body.lessonType,
		body.lessonLevel,
		body.inputText,
		body.lessonTitle
	);

	lessonPlan = await callOpenAI(lessonPlanReq);

	return json({ lessonPlan: lessonPlan });

	async function callOpenAI(lessonPlanReq: string) {
		const options = {
			timeout: 300000,
			method: 'POST',
			headers: {
				Authorization: `Bearer ${OPENAI_API_KEY}`,
				'Content-Type': 'application/json'
			},

			body: JSON.stringify({
				model: 'gpt-3.5-turbo-1106',
				messages: [{ role: 'user', content: lessonPlanReq }]
			})
		};
		try {
			const response = await fetch('https://api.openai.com/v1/chat/completions', options);
			const data = await response.json();
			console.log('the response from openai', data);
			return data.choices[0].message.content;
		} catch (error) {
			console.log('the error', error);
		}
	}
};
