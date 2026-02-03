import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTestQuestions, submitTestAnswers } from '../services/testApi';

export default function MockTestPage() {
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchTestQuestions(testId);
        setTest(data);
      } catch (e) {
        // ignore
      }
    }
    load();
  }, [testId]);

  const handleChange = (questionId, index) => {
    setAnswers((prev) => ({ ...prev, [questionId]: index }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = Object.entries(answers).map(([questionId, selectedIndex]) => ({
        questionId,
        selectedIndex,
      }));
      const result = await submitTestAnswers(testId, payload);
      navigate(`/tests/${testId}/result/${result.attemptId}`, { state: result });
    } catch (err) {
      // handle error
    } finally {
      setSubmitting(false);
    }
  };

  if (!test) {
    return (
      <div className="page">
        <p>Loading test...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>{test.title}</h2>
      <p>{test.description}</p>
      <form onSubmit={handleSubmit}>
        {test.questions.map((q, idx) => (
          <div key={q.id} className="question-card">
            <h3>
              Q{idx + 1}. {q.text}
            </h3>
            {q.options.map((opt, optIdx) => (
              <label key={optIdx} className="option">
                <input
                  type="radio"
                  name={q.id}
                  checked={answers[q.id] === optIdx}
                  onChange={() => handleChange(q.id, optIdx)}
                />
                {opt}
              </label>
            ))}
          </div>
        ))}
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit test'}
        </button>
      </form>
    </div>
  );
}

