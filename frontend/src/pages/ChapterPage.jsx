import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchChapters } from '../services/contentApi';

export default function ChapterPage() {
  const { subjectId } = useParams();
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchChapters(subjectId);
        setChapters(data);
      } catch (e) {
        // ignore
      }
    }
    load();
  }, [subjectId]);

  return (
    <div className="page">
      <h2>Chapters</h2>
      <div className="grid">
        {chapters.map((ch) => (
          <div key={ch._id} className="card">
            <h3>{ch.title}</h3>
            <div className="card-actions">
              <Link to={`/chapters/${ch._id}/notes`}>Notes</Link>
              <Link to={`/chapters/${ch._id}/resources`}>Resources</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

