import { useState } from "react";
import "./App.css";

function App() {
  const [noteTitle, setNoteTitle] = useState("");
  const [notes, setNotes] = useState([]);
  const [editableNote, setEditableNote] = useState();
  const [editMode, setEditMode] = useState()

  const editNote = (noteId) => {
    const toBeEditNote = notes.find(item => item.id == noteId)
    setEditMode(true)
    setEditableNote(toBeEditNote)
    setNoteTitle(toBeEditNote.title)
  }
  const updateNote = (event) => {
    event.preventDefault()
      setNotes(notes.map(item => {
        if (item.id === editableNote.id) {
          item.title = noteTitle
        }
        return item
      }))
      setEditMode(false)
      setEditableNote(null)
      setNoteTitle(" ")
  }
  const createNote = (event) => {
    event.preventDefault();
    if (noteTitle) {
      const newNote = {
        id: Date.now(),
        title: noteTitle,
        isComplete: false,
      };
      setNotes([...notes, newNote]);
      setNoteTitle(" ");
    } else {
      alert("Please enter valid title");
    }
  };
  const deleteNote = (noteId) => {
    const newNotes = notes.filter((item) => item.id !== noteId);
    setNotes(newNotes);
  };

  return (
    <div className="App">
      <form onSubmit={(event) => {
        editMode ? updateNote(event): createNote(event)
      }}>
        <input
          type="text"
          placeholder="Please Enter a Title"
          value={noteTitle}
          onChange={(event) => setNoteTitle(event.target.value)}
        />
        <button type="submit">
          {editMode ? "Update Note" : "Add Note"}
          </button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <span>{note.title}</span>
            <button onClick={() => editNote(note.id)}>Edit</button>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
