const express = require('express');
const {
  getTestsByChapter,
  getTestQuestions,
  submitTest,
  getMyAttempts,
} = require('../controllers/testController');
const { authRequired } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/chapters/:chapterId/tests', getTestsByChapter);
router.get('/tests/:testId/questions', authRequired, getTestQuestions);
router.post('/tests/:testId/submit', authRequired, submitTest);
router.get('/my-attempts', authRequired, getMyAttempts);

module.exports = router;

