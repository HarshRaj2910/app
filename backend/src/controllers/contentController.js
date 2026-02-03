const { ClassModel, Subject, Chapter, Note, Resource } = require('../models/ContentModels');

async function listClasses(req, res, next) {
  try {
    const classes = await ClassModel.find().sort({ level: 1 });
    res.json(classes);
  } catch (err) {
    next(err);
  }
}

async function listSubjectsByClass(req, res, next) {
  try {
    const { classLevel } = req.params;
    const subjects = await Subject.find({ classLevel: Number(classLevel) }).sort({ name: 1 });
    res.json(subjects);
  } catch (err) {
    next(err);
  }
}

async function listChapters(req, res, next) {
  try {
    const { subjectId } = req.params;
    const chapters = await Chapter.find({ subjectId }).sort({ title: 1 });
    res.json(chapters);
  } catch (err) {
    next(err);
  }
}

async function getNotesByChapter(req, res, next) {
  try {
    const { chapterId } = req.params;
    const notes = await Note.find({ chapterId });
    res.json(notes);
  } catch (err) {
    next(err);
  }
}

async function getResourcesByChapter(req, res, next) {
  try {
    const { chapterId } = req.params;
    const resources = await Resource.find({ chapterId });
    res.json(resources);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listClasses,
  listSubjectsByClass,
  listChapters,
  getNotesByChapter,
  getResourcesByChapter,
};

