import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState(localStorage.getItem('viewMode') || 'grid');

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
    <div style={{ padding: '20px' }}>
      {/* <h2>All Notes</h2> */}
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '10px',
          marginBottom: '15px',
          width: '100%',
          boxSizing: 'border-box',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
      <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
        <button
          onClick={() => { setViewMode('list'); localStorage.setItem('viewMode', 'list'); }}
          style={{
            padding: '10px 15px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: viewMode === 'list' ? '#007BFF' : '#ccc',
            color: 'black',
            cursor: 'pointer',
          }}
        >
          List View
        </button>
        <button
          onClick={() => { setViewMode('grid'); localStorage.setItem('viewMode', 'grid'); }}
          style={{
            padding: '10px 15px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: viewMode === 'grid' ? '#007BFF' : '#ccc',
            color: 'black',
            cursor: 'pointer',
          }}
        >
          Grid View
        </button>
      </div>
      {loading && <p>Loading notes...</p>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && filteredNotes.length === 0 && !error && <p>No notes found.</p>}
      <div
        style={{
          display: viewMode === 'grid' ? 'flex' : 'block',
          flexWrap: 'wrap',
          gap: '15px',
        }}
      >
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            style={{
              backgroundColor: note.color || '#f0f0f0',
              padding: '15px',
              borderRadius: '8px',
              boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
              minWidth: '250px',
              flexBasis: viewMode === 'grid' ? 'calc(33% - 15px)' : '100%',
              boxSizing: 'border-box',
              marginBottom: '15px',
            }}
          >
            <Link to={`/${note.id}`} style={{ textDecoration: 'none', color: 'black' }}>
              <h3>{note.title}</h3>
              <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{note.description}</pre>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Note;
