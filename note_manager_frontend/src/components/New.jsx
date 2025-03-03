import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const New = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#ffffff');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !color) {
      setError('Please fill in all fields');
      return;
    }

    setIsSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:8080/note/save', {
        title, 
        description, 
        color,
        emailID: localStorage.getItem('emailID'),
        password: localStorage.getItem('password'),
      });

      if (response.status === 200) {
        setTitle('');
        setDescription('');
        setColor('#ffffff');
        setSuccess('Note saved successfully!');
        navigate('/note');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save the note');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Create a New Note</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', minHeight: '100px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Color:</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ width: '100%', padding: '5px' }} />
        </div>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}
        <button type="submit" disabled={isSaving} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: isSaving ? '#ccc' : '#007bff', color: '#fff', fontSize: '16px', cursor: isSaving ? 'not-allowed' : 'pointer' }}>{isSaving ? 'Saving...' : 'Save Note'}</button>
      </form>
    </div>
  );
};

export default New;
