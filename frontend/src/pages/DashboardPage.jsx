import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { fetchMyAttempts } from '../services/testApi';

export default function DashboardPage() {
  const { user } = useAuth();
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchMyAttempts();
        setAttempts(data);
      } catch (e) {
        // ignore for now
      }
    }
    load();
  }, []);

  return (
    <div className="page">
      <h2>Welcome, {user.name}</h2>
      <p>Class {user.classLevel}</p>

      <section>
        <h3>Start learning</h3>
        <Link to="/classes" className="btn-primary">
          Browse classes & subjects
        </Link>
      </section>

      <section>
        <h3>Recent mock tests</h3>
        {attempts.length === 0 && <p>No attempts yet.</p>}
        <ul>
          {attempts.map((a) => (
            <li key={a.id}>
              {a.testTitle || 'Test'} - {a.score}% on{' '}
              {new Date(a.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

