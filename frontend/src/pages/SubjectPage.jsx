import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSubjects } from '../services/contentApi';

export default function SubjectPage() {
  const { classLevel } = useParams();
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchSubjects(classLevel);
        setSubjects(data);
      } catch (e) {
        // ignore
      }
    }
    load();
  }, [classLevel]);

  return (
    <div className="page">
      <h2>Subjects for Class {classLevel}</h2>
      <div className="grid">
        {subjects.map((s) => (
          <button
            type="button"
            key={s._id}
            className="card"
            onClick={() => navigate(`/subjects/${s._id}/chapters`)}
          >
            {s.name}
          </button>
        ))}
      </div>
    </div>
  );
}

