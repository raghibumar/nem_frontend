import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://nem-backend-tvjb.onrender.com/notes", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"), // Direct token usage without "Bearer"
        "Content-Type": "application/json", // Corrected Content-Type
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setNotes(data);
      });
  }, []);

  const handleDeleteNote = (noteId) => {
    fetch(`https://nem-backend-tvjb.onrender.com/notes/delete/${noteId}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error deleting note: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("data:", data);
        setNotes((prevNotes) => {
          return prevNotes.filter((note) => {
            return note._id !== noteId;
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateNote = (noteId) => {
    console.log("noteId:", noteId);

    navigate(`/update/${noteId}`);
  };

  return (
    <>
      <div>Notes</div>
      <div>
        {notes.map((note) => {
          return (
            <div
              style={{
                border: "1px solid black",
                marginBottom: "10px",
              }}
              key={note._id}
            >
              <h2>Title: {note.title}</h2>
              <p>Note: {note.note}</p>
              <p>Category: {note.category}</p>
              <button onClick={handleDeleteNote.bind(null, note._id)}>
                Delete
              </button>
              <button onClick={handleUpdateNote.bind(null, note._id)}>
                Update
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Notes;
