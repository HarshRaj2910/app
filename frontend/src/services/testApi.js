import api from './apiClient';

export async function fetchTestsByChapter(chapterId) {
  const res = await api.get(`/tests/chapters/${chapterId}/tests`);
  return res.data;
}

export async function fetchTestQuestions(testId) {
  const res = await api.get(`/tests/tests/${testId}/questions`);
  return res.data.test;
}

export async function submitTestAnswers(testId, answers) {
  const res = await api.post(`/tests/tests/${testId}/submit`, { answers });
  return res.data;
}

export async function fetchMyAttempts() {
  const res = await api.get('/tests/my-attempts');
  return res.data;
}

