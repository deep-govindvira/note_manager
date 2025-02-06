import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Create a New Note</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Color:</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>{success}</div>}
        <button type="submit" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Note'}</button>
      </form>
    </div>
  );
};

export default New;
