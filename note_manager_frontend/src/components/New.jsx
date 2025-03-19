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
      const response = await axios.post('http://localhost:8080/note', {
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

  const styles = {
    container: {
      maxWidth: '480px',
      margin: '40px auto',
      padding: '24px',
      borderRadius: '16px',
      backgroundColor: '#fafafa',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
    },
    heading: {
      textAlign: 'center',
      color: '#333',
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    formGroup: {
      marginBottom: '16px',
    },
    label: {
      display: 'block',
      fontSize: '16px',
      color: '#555',
      marginBottom: '6px',
      fontWeight: '500',
    },
    input: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontSize: '16px',
      outline: 'none',
      transition: 'border-color 0.2s ease',
      boxSizing: 'border-box',
    },
    textarea: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontSize: '16px',
      minHeight: '120px',
      outline: 'none',
      transition: 'border-color 0.2s ease',
      boxSizing: 'border-box',
      resize: 'none',
    },
    colorWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    colorCircle: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      border: '2px solid #ccc',
      cursor: 'pointer',
      transition: 'transform 0.2s ease',
    },
    button: {
      width: '100%',
      padding: '14px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: isSaving ? '#ccc' : '#007bff',
      color: '#fff',
      fontSize: '16px',
      fontWeight: '500',
      cursor: isSaving ? 'not-allowed' : 'pointer',
      transition: 'background-color 0.3s ease',
      outline: 'none',
    },
    error: {
      color: '#d32f2f',
      fontSize: '14px',
      marginBottom: '10px',
    },
    success: {
      color: '#388e3c',
      fontSize: '14px',
      marginBottom: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create a New Note</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Title:</label>
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={styles.textarea}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Color:</label>
          <div style={styles.colorWrapper}>
            <div 
              style={{
                ...styles.colorCircle,
                backgroundColor: color,
                transform: 'scale(1.05)',
              }}
              onClick={() => document.getElementById('colorInput').click()}
            />
            <input 
              id="colorInput"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{ display: 'none' }}
            />
          </div>
        </div>
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}
        <button
          type="submit"
          disabled={isSaving}
          style={styles.button}
        >
          {isSaving ? 'Saving...' : 'Save Note'}
        </button>
      </form>
    </div>
  );
};

export default New;
