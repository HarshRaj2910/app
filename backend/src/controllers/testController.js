const { Test, Question, TestAttempt } = require('../models/TestModels');

async function getTestsByChapter(req, res, next) {
  try {
    const { chapterId } = req.params;
    const tests = await Test.find({ chapterId }).select('title description timeLimitMinutes');
    res.json(tests);
  } catch (err) {
    next(err);
  }
}

async function getTestQuestions(req, res, next) {
  try {
    const { testId } = req.params;
    const test = await Test.findById(testId).populate('questions');
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    const safeQuestions = test.questions.map((q) => ({
      id: q._id,
      text: q.text,
      options: q.options,
    }));

    return res.json({
      test: {
        id: test._id,
        title: test.title,
        description: test.description,
        timeLimitMinutes: test.timeLimitMinutes,
        questions: safeQuestions,
      },
    });
  } catch (err) {
    return next(err);
  }
}

async function submitTest(req, res, next) {
  try {
    const { testId } = req.params;
    const { answers } = req.body; // [{ questionId, selectedIndex }]

    const test = await Test.findById(testId).populate('questions');
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    if (!Array.isArray(answers)) {
      return res.status(400).json({ message: 'Answers must be an array' });
    }

    let correctCount = 0;
    const answerRecords = [];

    answers.forEach((ans) => {
      const q = test.questions.find((question) => question._id.toString() === ans.questionId);
      if (!q) return;
      const isCorrect = ans.selectedIndex === q.correctIndex;
      if (isCorrect) correctCount += 1;
      answerRecords.push({
        questionId: q._id,
        selectedIndex: ans.selectedIndex,
        isCorrect,
      });
    });

    const totalQuestions = test.questions.length || 1;
    const score = Math.round((correctCount / totalQuestions) * 100);

    const attempt = await TestAttempt.create({
      userId: req.user._id,
      testId: test._id,
      answers: answerRecords,
      score,
    });

    return res.status(201).json({
      attemptId: attempt._id,
      score,
      correctCount,
      totalQuestions,
    });
  } catch (err) {
    return next(err);
  }
}

async function getMyAttempts(req, res, next) {
  try {
    const attempts = await TestAttempt.find({ userId: req.user._id })
      .populate('testId', 'title')
      .sort({ createdAt: -1 });

    const result = attempts.map((a) => ({
      id: a._id,
      testTitle: a.testId?.title,
      score: a.score,
      createdAt: a.createdAt,
    }));

    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getTestsByChapter,
  getTestQuestions,
  submitTest,
  getMyAttempts,
};

