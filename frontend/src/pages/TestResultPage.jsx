import { useLocation, useNavigate } from 'react-router-dom';

export default function TestResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="page">
        <p>No result data. Go back to dashboard.</p>
      </div>
    );
  }

  const { score, correctCount, totalQuestions } = state;

  return (
    <div className="page">
      <h2>Test Result</h2>
      <p>
        Score: <strong>{score}%</strong>
      </p>
      <p>
        Correct: {correctCount} / {totalQuestions}
      </p>
      <button type="button" className="btn-primary" onClick={() => navigate('/dashboard')}>
        Back to dashboard
      </button>
    </div>
  );
}

