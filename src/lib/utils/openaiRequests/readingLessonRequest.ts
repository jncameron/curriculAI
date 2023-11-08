export const readinglessonPlanRequest = (
	classType: string,
	lessonType: string,
	lessonLevel: string,
	inputText: string,
	lessonTitle: string
) => {
	return ` 
	
Create a lesson plan for an adult ${classType} ESL class. The students are at the ${lessonLevel} level.
The focus skill of the lesson is ${lessonType}.

The source material for the lesson, if provided is here: "${inputText}"

If no source material has been provided, create a text that is appropriate for the lesson and the class reading level. This could be a short story, a news article, a wikipedia article, etc.

Lesson Title: ${lessonTitle}

The lesson plan should be for a 120 minute class.

The lesson plan will follow this format:

1. Warm Up (10 minutes) - The warm up should be a speaking activity that gets the students talking about the topic of the lesson. Provide 3 general knowledge questions about the topic of the lesson. Remember, the student may not be familiar with the topic of the lesson.

2. Vocabulary (10 minutes) - 	Create a vocabulary matching exercise using vocabulary words from the source material. Create a table with 4 columns. The headers for columns 2 and 4 are are 'Words' and 'Definitions'. There are 8 rows, 1 for each word and definition
Put numbers 1 - 8 in Column 1. Put the vocabulary words in alphabetical order in Column 2. Put the letters A - H in Column IN DESCENDING ORDER 3. Put the definitions in Column 4 in a RANDOM ORDER. Do Not include the A - H letter in Column 4. A definition of a word is not in the same row
as the word itself.
The students will need to match the Word to the Definition (and therefore the number to the letter). 

Vocabulary answers will not be provided to the students until after the reading comprehension section.

3. Reading Comprehension (20 minutes) - The reading comprehension section will be a reading passage followed by 6 questions. Create 3 multiple choice and 3 written answer questions. The answers to the questions will be in the reading passage. 
The reading passage will be 300 - 500 words long. The reading passage will be about the same topic as the lesson. The reading passage will be written at the same level as the students. 
The reading passage will be written in the same style as the source material. 

4. Activities: The lesson plan will also include at least one speaking activity and one writing activity. Preferably, the speaking activity will be a role play.

5. Homework: The lesson plan will include homework for the students to complete before the next class.

6. Source Material: Include the ENTIRE source material here. Do not truncate or summarize it. The source material should be in italics.

7. Student Handouts: Including the Vocabulary Matching Table and the Comprehension Questions in a format that will be printed and handed out to students. Also any additional handouts required from the "4. Activities section". If there is more than one handout, insert a PAGE BREAK between each handout.

Style the lesson plan using html and css.

`;
};
