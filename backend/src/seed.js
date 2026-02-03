require('dotenv').config();
const mongoose = require('mongoose');
const { connectDB } = require('./config/db');
const { ClassModel, Subject, Chapter, Note, Resource } = require('./models/ContentModels');
const { Question, Test } = require('./models/TestModels');

async function seed() {
  try {
    await connectDB();

    // Clear existing data
    await Promise.all([
      ClassModel.deleteMany({}),
      Subject.deleteMany({}),
      Chapter.deleteMany({}),
      Note.deleteMany({}),
      Resource.deleteMany({}),
      Question.deleteMany({}),
      Test.deleteMany({}),
    ]);

    // Create classes 2-12 with subjects, chapters, notes, resources, tests
    for (let level = 2; level <= 12; level += 1) {
      // eslint-disable-next-line no-await-in-loop
      await ClassModel.create({
        name: `Class ${level}`,
        level,
      });

      // Core subjects for each class
      // eslint-disable-next-line no-await-in-loop
      const maths = await Subject.create({ name: 'Mathematics', classLevel: level });
      // eslint-disable-next-line no-await-in-loop
      const science = await Subject.create({ name: 'Science', classLevel: level });
      // eslint-disable-next-line no-await-in-loop
      const english = await Subject.create({ name: 'English', classLevel: level });
      // eslint-disable-next-line no-await-in-loop
      const social = await Subject.create({ name: 'Social Science', classLevel: level });

      // Chapters
      // eslint-disable-next-line no-await-in-loop
      const mathsChapter = await Chapter.create({
        title: `Number Systems and Basic Algebra (Class ${level})`,
        subjectId: maths._id,
        classLevel: level,
      });

      // eslint-disable-next-line no-await-in-loop
      const scienceChapter = await Chapter.create({
        title: `Matter and Our Environment (Class ${level})`,
        subjectId: science._id,
        classLevel: level,
      });

      // eslint-disable-next-line no-await-in-loop
      const englishChapter = await Chapter.create({
        title: `Reading Comprehension and Grammar (Class ${level})`,
        subjectId: english._id,
        classLevel: level,
      });

      // eslint-disable-next-line no-await-in-loop
      const socialChapter = await Chapter.create({
        title: `India and the World (Class ${level})`,
        subjectId: social._id,
        classLevel: level,
      });

      // Notes
      // eslint-disable-next-line no-await-in-loop
      await Note.create({
        title: `Important concepts in Mathematics - Class ${level}`,
        content:
          'This chapter covers natural numbers, whole numbers, basic operations on integers, and an introduction to simple linear equations used in everyday problems. Practice examples include finding unknown values and checking solutions.',
        attachments: [],
        chapterId: mathsChapter._id,
        subjectId: maths._id,
        classLevel: level,
      });

      // eslint-disable-next-line no-await-in-loop
      await Note.create({
        title: `Key ideas in Science - Class ${level}`,
        content:
          'You will learn about states of matter, how substances change from solid to liquid and gas, and examples of physical and chemical changes around you. Diagrams focus on particle arrangement and common experiments.',
        attachments: [],
        chapterId: scienceChapter._id,
        subjectId: science._id,
        classLevel: level,
      });

      // eslint-disable-next-line no-await-in-loop
      await Note.create({
        title: `English skills for Class ${level}`,
        content:
          'This note explains how to pick the main idea from a passage, identify supporting details, and avoid common grammar mistakes like subject–verb agreement errors and incorrect tense usage.',
        attachments: [],
        chapterId: englishChapter._id,
        subjectId: english._id,
        classLevel: level,
      });

      // eslint-disable-next-line no-await-in-loop
      await Note.create({
        title: `Social Science overview - Class ${level}`,
        content:
          'Topics include basic facts about India, important physical features, neighbouring countries, and how India connects to the rest of the world through trade, culture, and history.',
        attachments: [],
        chapterId: socialChapter._id,
        subjectId: social._id,
        classLevel: level,
      });

      // Resources
      // eslint-disable-next-line no-await-in-loop
      await Resource.create({
        title: `Mathematics chapter PDF - Class ${level}`,
        description: 'Chapter handout with worked examples on number systems and simple equations.',
        type: 'pdf',
        url: 'https://your-learning-site.com/resources/maths-number-systems.pdf',
        chapterId: mathsChapter._id,
        subjectId: maths._id,
        classLevel: level,
      });

      // eslint-disable-next-line no-await-in-loop
      await Resource.create({
        title: `Science concept video - Class ${level}`,
        description:
          'Short video explaining changes of state, evaporation, condensation, and daily-life examples.',
        type: 'video',
        url: 'https://your-learning-site.com/videos/science-matter.mp4',
        chapterId: scienceChapter._id,
        subjectId: science._id,
        classLevel: level,
      });

      // eslint-disable-next-line no-await-in-loop
      await Resource.create({
        title: `English practice worksheet - Class ${level}`,
        description: 'Printable worksheet with reading passages and grammar exercises.',
        type: 'pdf',
        url: 'https://your-learning-site.com/resources/english-worksheet.pdf',
        chapterId: englishChapter._id,
        subjectId: english._id,
        classLevel: level,
      });

      // eslint-disable-next-line no-await-in-loop
      await Resource.create({
        title: `Map and civics notes - Class ${level}`,
        description: 'Revision sheet highlighting important locations and basic civics terms.',
        type: 'pdf',
        url: 'https://your-learning-site.com/resources/social-india-world.pdf',
        chapterId: socialChapter._id,
        subjectId: social._id,
        classLevel: level,
      });

      // Tests: two questions per subject
      // Mathematics test
      // eslint-disable-next-line no-await-in-loop
      const mathsQ1 = await Question.create({
        text: 'What is 12 + 8?',
        options: ['18', '20', '21', '22'],
        correctIndex: 1,
        explanation: '12 + 8 = 20.',
        chapterId: mathsChapter._id,
        subjectId: maths._id,
        classLevel: level,
        difficulty: 'easy',
      });

      // eslint-disable-next-line no-await-in-loop
      const mathsQ2 = await Question.create({
        text: 'Which of the following is a prime number?',
        options: ['4', '9', '11', '15'],
        correctIndex: 2,
        explanation: '11 has only two factors, 1 and 11.',
        chapterId: mathsChapter._id,
        subjectId: maths._id,
        classLevel: level,
        difficulty: 'easy',
      });

      // eslint-disable-next-line no-await-in-loop
      await Test.create({
        title: `Mathematics basics quiz - Class ${level}`,
        description: 'Check your understanding of number operations and prime numbers.',
        chapterId: mathsChapter._id,
        subjectId: maths._id,
        classLevel: level,
        questions: [mathsQ1._id, mathsQ2._id],
        timeLimitMinutes: 10,
      });

      // Science test
      // eslint-disable-next-line no-await-in-loop
      const sciQ1 = await Question.create({
        text: 'When water changes from liquid to gas, the process is called:',
        options: ['Evaporation', 'Condensation', 'Freezing', 'Melting'],
        correctIndex: 0,
        explanation: 'Evaporation is the change of state from liquid to gas.',
        chapterId: scienceChapter._id,
        subjectId: science._id,
        classLevel: level,
        difficulty: 'easy',
      });

      // eslint-disable-next-line no-await-in-loop
      const sciQ2 = await Question.create({
        text: 'Which of the following is a renewable source of energy?',
        options: ['Coal', 'Petroleum', 'Solar energy', 'Natural gas'],
        correctIndex: 2,
        explanation: 'Solar energy can be used again and again and does not get exhausted.',
        chapterId: scienceChapter._id,
        subjectId: science._id,
        classLevel: level,
        difficulty: 'easy',
      });

      // eslint-disable-next-line no-await-in-loop
      await Test.create({
        title: `Science fundamentals quiz - Class ${level}`,
        description: 'Short quiz on states of matter and sources of energy.',
        chapterId: scienceChapter._id,
        subjectId: science._id,
        classLevel: level,
        questions: [sciQ1._id, sciQ2._id],
        timeLimitMinutes: 10,
      });

      // English test
      // eslint-disable-next-line no-await-in-loop
      const engQ1 = await Question.create({
        text: 'Choose the sentence with correct grammar:',
        options: [
          'She don\'t like maths.',
          'She doesn\'t likes maths.',
          'She doesn\'t like maths.',
          'She not like maths.',
        ],
        correctIndex: 2,
        explanation: '`She doesn’t like maths` is grammatically correct.',
        chapterId: englishChapter._id,
        subjectId: english._id,
        classLevel: level,
        difficulty: 'easy',
      });

      // eslint-disable-next-line no-await-in-loop
      const engQ2 = await Question.create({
        text: 'The word "rapid" means:',
        options: ['Very slow', 'Very fast', 'Very small', 'Very loud'],
        correctIndex: 1,
        explanation: '“Rapid” is a synonym of “very fast”.',
        chapterId: englishChapter._id,
        subjectId: english._id,
        classLevel: level,
        difficulty: 'easy',
      });

      // eslint-disable-next-line no-await-in-loop
      await Test.create({
        title: `English skills quiz - Class ${level}`,
        description: 'Two quick questions on grammar and vocabulary.',
        chapterId: englishChapter._id,
        subjectId: english._id,
        classLevel: level,
        questions: [engQ1._id, engQ2._id],
        timeLimitMinutes: 10,
      });

      // Social Science test
      // eslint-disable-next-line no-await-in-loop
      const socQ1 = await Question.create({
        text: 'Delhi is the capital of which country?',
        options: ['India', 'Nepal', 'Sri Lanka', 'Bangladesh'],
        correctIndex: 0,
        explanation: 'New Delhi is the capital city of India.',
        chapterId: socialChapter._id,
        subjectId: social._id,
        classLevel: level,
        difficulty: 'easy',
      });

      // eslint-disable-next-line no-await-in-loop
      const socQ2 = await Question.create({
        text: 'The Constitution of India came into effect on:',
        options: ['15 August 1947', '26 January 1950', '2 October 1869', '26 November 1949'],
        correctIndex: 1,
        explanation: 'The Constitution of India was enforced on 26 January 1950.',
        chapterId: socialChapter._id,
        subjectId: social._id,
        classLevel: level,
        difficulty: 'easy',
      });

      // eslint-disable-next-line no-await-in-loop
      await Test.create({
        title: `Social Science basics quiz - Class ${level}`,
        description: 'Questions on India, its capital, and important dates.',
        chapterId: socialChapter._id,
        subjectId: social._id,
        classLevel: level,
        questions: [socQ1._id, socQ2._id],
        timeLimitMinutes: 10,
      });
    }

    // eslint-disable-next-line no-console
    console.log('Seeding completed successfully for classes 2 to 12');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Seeding failed:', err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seed();

