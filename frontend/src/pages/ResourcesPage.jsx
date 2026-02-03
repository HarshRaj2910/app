import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchResources } from '../services/contentApi';
import { fetchTestsByChapter } from '../services/testApi';
import { Link } from 'react-router-dom';

export default function ResourcesPage() {
  const { chapterId } = useParams();
  const [resources, setResources] = useState([]);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const [resData, testData] = await Promise.all([
          fetchResources(chapterId),
          fetchTestsByChapter(chapterId),
        ]);
        setResources(resData);
        setTests(testData);
      } catch (e) {
        // ignore
      }
    }
    load();
  }, [chapterId]);

  return (
    <div className="page">
      <h2>Resources & Mock Tests</h2>
      <section>
        <h3>Resources</h3>
        <ul>
          {resources.map((r) => (
            <li key={r._id}>
              <a href={r.url} target="_blank" rel="noreferrer">
                {r.title}
              </a>
            </li>
          ))}
        </ul>
        {resources.length === 0 && <p>No resources available yet.</p>}
      </section>

      <section>
        <h3>Mock tests</h3>
        <ul>
          {tests.map((t) => (
            <li key={t._id}>
              {t.title} - <Link to={`/tests/${t._id}`}>Start test</Link>
            </li>
          ))}
        </ul>
        {tests.length === 0 && <p>No tests available yet.</p>}
      </section>
    </div>
  );
}

