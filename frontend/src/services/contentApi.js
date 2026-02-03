import api from './apiClient';

export async function fetchClasses() {
  const res = await api.get('/content/classes');
  return res.data;
}

export async function fetchSubjects(classLevel) {
  const res = await api.get(`/content/classes/${classLevel}/subjects`);
  return res.data;
}

export async function fetchChapters(subjectId) {
  const res = await api.get(`/content/subjects/${subjectId}/chapters`);
  return res.data;
}

export async function fetchNotes(chapterId) {
  const res = await api.get(`/content/chapters/${chapterId}/notes`);
  return res.data;
}

export async function fetchResources(chapterId) {
  const res = await api.get(`/content/chapters/${chapterId}/resources`);
  return res.data;
}

