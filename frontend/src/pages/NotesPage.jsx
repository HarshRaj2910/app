import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchNotes } from '../services/contentApi';

export default function NotesPage() {
  const { chapterId } = useParams();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchNotes(chapterId);
        setNotes(data);
      } catch (e) {
        // ignore
      }
    }
    load();
  }, [chapterId]);

  return (
    <div className="page">
      <h2>Notes</h2>
      {notes.map((n) => (
        <article key={n._id} className="note">
          <h3>{n.title}</h3>
          <p>{n.content}</p>
          {n.attachments?.length > 0 && (
            <ul>
              {n.attachments.map((a) => (
                <li key={a}>
                  <a href={a} target="_blank" rel="noreferrer">
                    Attachment
                  </a>
                </li>
              ))}
            </ul>
          )}
        </article>
      ))}
      {notes.length === 0 && <p>No notes available yet.</p>}
    </div>
  );
}

