import type { PageLoad } from './$types';

export const load = async ({ fetch, params }) => {
	console.log(params);
	//const res = await fetch(`/api/lessons/${params.lessonid}`);
	return params;
};
