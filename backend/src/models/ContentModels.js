const mongoose = require('mongoose');

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g. "Class 2"
    level: { type: Number, required: true, min: 2, max: 12, unique: true },
  },
  { timestamps: true }
);

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g. "Math"
    classLevel: { type: Number, required: true, min: 2, max: 12 },
  },
  { timestamps: true }
);

const chapterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    classLevel: { type: Number, required: true, min: 2, max: 12 },
  },
  { timestamps: true }
);

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true }, // basic rich text/markdown later
    attachments: [{ type: String }], // URLs to PDFs/resources
    chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    classLevel: { type: Number, required: true, min: 2, max: 12 },
  },
  { timestamps: true }
);

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ['pdf', 'video', 'link', 'other'], default: 'link' },
    url: { type: String, required: true },
    chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    classLevel: { type: Number, required: true, min: 2, max: 12 },
  },
  { timestamps: true }
);

const ClassModel = mongoose.model('Class', classSchema);
const Subject = mongoose.model('Subject', subjectSchema);
const Chapter = mongoose.model('Chapter', chapterSchema);
const Note = mongoose.model('Note', noteSchema);
const Resource = mongoose.model('Resource', resourceSchema);

module.exports = {
  ClassModel,
  Subject,
  Chapter,
  Note,
  Resource,
};

