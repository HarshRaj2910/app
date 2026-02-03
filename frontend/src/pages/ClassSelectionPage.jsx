import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchClasses } from '../services/contentApi';

export default function ClassSelectionPage() {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchClasses();
        setClasses(data);
      } catch (e) {
        // ignore
      }
    }
    load();
  }, []);

  return (
    <div className="page">
      <h2>Select your class</h2>
      <div className="grid">
        {classes.map((c) => (
          <button
            type="button"
            key={c._id}
            className="card"
            onClick={() => navigate(`/classes/${c.level}/subjects`)}
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}

