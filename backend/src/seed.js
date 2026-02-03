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

    // Create classes 2-12
    const classes = [];
    for (let level = 2; level <= 12; level += 1) {
      // eslint-disable-next-line no-await-in-loop
      const cls = await ClassModel.create({
        name: `Class ${level}`,
        level,
      });
      classes.push(cls);
    }

    const class10 = classes.find((c) => c.level === 10);

    // Basic subjects for class 10
    const math = await Subject.create({ name: 'Mathematics', classLevel: 10 });
    const science = await Subject.create({ name: 'Science', classLevel: 10 });

    // Chapters
    const algebra = await Chapter.create({
      title: 'Algebra - Linear Equations',
      subjectId: math._id,
      classLevel: 10,
    });

    const physics = await Chapter.create({
      title: 'Physics - Motion',
      subjectId: science._id,
      classLevel: 10,
    });

    // Notes
    await Note.create({
      title: 'Introduction to Linear Equations',
      content:
        'A linear equation in one variable is an equation that can be written in the form ax + b = 0, where a and b are real numbers and a ≠ 0.',
      attachments: [],
      chapterId: algebra._id,
      subjectId: math._id,
      classLevel: 10,
    });

    await Note.create({
      title: 'Types of Motion',
      content:
        'Motion can be classified as uniform and non-uniform. In uniform motion, an object covers equal distances in equal intervals of time.',
      attachments: [],
      chapterId: physics._id,
      subjectId: science._id,
      classLevel: 10,
    });

    // Resources
    await Resource.create({
      title: 'NCERT Linear Equations PDF',
      description: 'NCERT chapter on Linear Equations (sample link).',
      type: 'pdf',
      url: 'https://example.com/ncert-linear-equations.pdf',
      chapterId: algebra._id,
      subjectId: math._id,
      classLevel: 10,
    });

    await Resource.create({
      title: 'Kinematics Basics Video',
      description: 'Introductory video on motion.',
      type: 'video',
      url: 'https://example.com/kinematics-video',
      chapterId: physics._id,
      subjectId: science._id,
      classLevel: 10,
    });

    // Questions for algebra test
    const q1 = await Question.create({
      text: 'What is the solution of 2x + 4 = 0?',
      options: ['x = 2', 'x = -2', 'x = 4', 'x = -4'],
      correctIndex: 1,
      explanation: '2x + 4 = 0 → 2x = -4 → x = -2.',
      chapterId: algebra._id,
      subjectId: math._id,
      classLevel: 10,
      difficulty: 'easy',
    });

    const q2 = await Question.create({
      text: 'A linear equation in one variable has:',
      options: ['No solution', 'Exactly one solution', 'Two solutions', 'Infinitely many solutions'],
      correctIndex: 1,
      explanation: 'A linear equation in one variable has a unique solution.',
      chapterId: algebra._id,
      subjectId: math._id,
      classLevel: 10,
      difficulty: 'easy',
    });

    // Algebra test
    await Test.create({
      title: 'Algebra Basics Quiz',
      description: 'Check your understanding of linear equations.',
      chapterId: algebra._id,
      subjectId: math._id,
      classLevel: 10,
      questions: [q1._id, q2._id],
      timeLimitMinutes: 15,
    });

    // eslint-disable-next-line no-console
    console.log('Seeding completed successfully for class', class10.name);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Seeding failed:', err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seed();

