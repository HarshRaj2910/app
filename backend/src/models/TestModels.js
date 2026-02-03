const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctIndex: { type: Number, required: true },
    explanation: { type: String },
    chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    classLevel: { type: Number, required: true, min: 2, max: 12 },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'easy' },
  },
  { timestamps: true }
);

const testSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    classLevel: { type: Number, required: true, min: 2, max: 12 },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    timeLimitMinutes: { type: Number }, // optional
  },
  { timestamps: true }
);

const testAttemptSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
    answers: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
        selectedIndex: { type: Number, required: true },
        isCorrect: { type: Boolean, required: true },
      },
    ],
    score: { type: Number, required: true }, // percentage 0-100
  },
  { timestamps: true }
);

const Question = mongoose.model('Question', questionSchema);
const Test = mongoose.model('Test', testSchema);
const TestAttempt = mongoose.model('TestAttempt', testAttemptSchema);

module.exports = {
  Question,
  Test,
  TestAttempt,
};

