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
          password: localStorage.getItem('password')
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
              password: localStorage.getItem('password')
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
        password: localStorage.getItem('password')
      });

      if (response.status === 200) {
        alert('Note deleted successfully!');
        navigate('/note'); // Redirect to homepage after deletion
      }
    } catch (error) {
      setError('Failed to delete the note');
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <h2>Edit Note</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {isSaving && <div style={{ color: 'blue' }}>Saving...</div>}
      {isDeleting && <div style={{ color: 'orange' }}>Deleting...</div>}

      <form>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={note.title} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={note.description} onChange={handleChange} />
        </div>
        <div>
          <label>Color:</label>
          <input type="color" name="color" value={note.color} onChange={handleChange} />
        </div>
      </form>

      <button onClick={handleDelete} disabled={isDeleting} style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }}>
        {isDeleting ? 'Deleting...' : 'Delete Note'}
      </button>
    </div>
  );
};

export default NoteID;
