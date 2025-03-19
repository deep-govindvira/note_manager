import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const NoteID = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: '', description: '', color: '#ffffff' });
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.post(`http://localhost:8080/user/notes/get`, {
          id: noteId,
          emailID: localStorage.getItem('emailID'),
          password: localStorage.getItem('password'),
        });

        if (response.status === 200) {
          setNote(response.data);
        }
      } catch (error) {
        setError('Failed to fetch note details');
        console.error(error);
      }
    };

    fetchNote();
  }, [noteId]);

  const saveNote = useCallback(
    (() => {
      let timer;
      return (updatedNote) => {
        clearTimeout(timer);
        timer = setTimeout(async () => {
          setIsSaving(true);
          try {
            const response = await axios.post(`http://localhost:8080/user/notes/update`, {
              id: noteId,
              title: updatedNote.title,
              description: updatedNote.description,
              color: updatedNote.color,
              emailID: localStorage.getItem('emailID'),
              password: localStorage.getItem('password'),
            });

            if (response.status === 200) {
              console.log('Note updated successfully!');
            }
          } catch (error) {
            setError('Failed to update the note');
            console.error(error);
          } finally {
            setIsSaving(false);
          }
        }, 1000);
      };
    })(),
    [noteId]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedNote = { ...note, [name]: value };
    setNote(updatedNote);
    saveNote(updatedNote);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;

    setIsDeleting(true);
    setError('');

    try {
      const response = await axios.post(`http://localhost:8080/user/notes/delete`, {
        id: noteId,
        emailID: localStorage.getItem('emailID'),
        password: localStorage.getItem('password'),
      });

      if (response.status === 200) {
        alert('Note deleted successfully!');
        navigate('/note');
      }
    } catch (error) {
      setError('Failed to delete the note');
      console.error(error);
    } finally {
      setIsDeleting(false);
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
      backgroundColor: isDeleting ? '#ccc' : '#d32f2f',
      color: '#fff',
      fontSize: '16px',
      fontWeight: '500',
      cursor: isDeleting ? 'not-allowed' : 'pointer',
      transition: 'background-color 0.3s ease',
      outline: 'none',
    },
    error: {
      color: '#d32f2f',
      fontSize: '14px',
      marginBottom: '10px',
    },
    saving: {
      color: '#1976d2',
      fontSize: '14px',
      marginBottom: '10px',
    },
    deleting: {
      color: '#f57c00',
      fontSize: '14px',
      marginBottom: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Edit Note</h2>
      {error && <div style={styles.error}>{error}</div>}
      {isSaving && <div style={styles.saving}>Saving...</div>}
      {isDeleting && <div style={styles.deleting}>Deleting...</div>}

      <form>
        <div style={styles.formGroup}>
          <label style={styles.label}>Title:</label>
          <input 
            type="text" 
            name="title" 
            value={note.title} 
            onChange={handleChange} 
            style={styles.input} 
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Description:</label>
          <textarea 
            name="description" 
            value={note.description} 
            onChange={handleChange} 
            style={styles.textarea} 
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Color:</label>
          <div style={styles.colorWrapper}>
            <div 
              style={{
                ...styles.colorCircle,
                backgroundColor: note.color,
              }}
              onClick={() => document.getElementById('colorInput').click()}
            />
            <input 
              id="colorInput"
              type="color"
              name="color"
              value={note.color}
              onChange={handleChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>
      </form>

      <button 
        onClick={handleDelete} 
        disabled={isDeleting} 
        style={styles.button}
      >
        {isDeleting ? 'Deleting...' : 'Delete Note'}
      </button>
    </div>
  );
};

export default NoteID;
