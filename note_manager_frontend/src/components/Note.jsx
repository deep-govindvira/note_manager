import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState(localStorage.getItem('viewMode'));

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
      <div>
        <button onClick={() => { setViewMode('list'); localStorage.setItem('viewMode', 'list')}}>List View</button>
        <button onClick={() => { setViewMode('grid'); localStorage.setItem('viewMode', 'grid')}}>Grid View</button>
      </div>
      {loading && <p>Loading notes...</p>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {!loading && filteredNotes.length === 0 && !error && <p>No notes found.</p>}

      <div
        style={{
          display: viewMode === 'grid' ? 'flex' : 'block',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            style={{
              backgroundColor: note.color || '#f0f0f0',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
              boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
              flexGrow: 1,
              flexShrink: 1,
              flexBasis: 'calc(33% - 10px)',
              boxSizing: 'border-box', 
              minWidth: '250px',
            }}
          >
            <Link to={`/${note.id}`} style={{ textDecoration: 'none', color: 'black' }}>
              <h3>{note.title}</h3>
              <pre>{note.description}</pre>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Note;
