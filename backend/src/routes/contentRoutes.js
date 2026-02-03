const express = require('express');
const {
  listClasses,
  listSubjectsByClass,
  listChapters,
  getNotesByChapter,
  getResourcesByChapter,
} = require('../controllers/contentController');

const router = express.Router();

router.get('/classes', listClasses);
router.get('/classes/:classLevel/subjects', listSubjectsByClass);
router.get('/subjects/:subjectId/chapters', listChapters);
router.get('/chapters/:chapterId/notes', getNotesByChapter);
router.get('/chapters/:chapterId/resources', getResourcesByChapter);

module.exports = router;

