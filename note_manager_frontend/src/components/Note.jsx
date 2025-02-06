import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await axios.post('http://localhost:8080/user/notes', {
          emailID: localStorage.getItem('emailID'),
          password: localStorage.getItem('password'),
        });

        if (response.status === 200) {
          setNotes(response.data);
          setFilteredNotes(response.data);
        }
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch notes');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    const filtered = notes.filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [searchTerm, notes]);

  return (
    <div>
      <h2>All Notes</h2>
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '8px', marginBottom: '10px', width: '100%', boxSizing: 'border-box' }}
      />
      {loading && <p>Loading notes...</p>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {!loading && filteredNotes.length === 0 && !error && <p>No notes found.</p>}

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {filteredNotes.map((note) => (
          <li
            key={note.id}
            style={{
              backgroundColor: note.color || '#f0f0f0',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
              boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
            }}
          >
            <Link to={`/${note.id}`} style={{ textDecoration: 'none', color: 'black' }}>
              <h3>{note.title}</h3>
              <p>{note.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Note;
