import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateNote = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();

  const [notes, setNotes] = useState({
    title: "",
    note: "",
    category: "",
  });

  useEffect(() => {
    fetch(`https://nem-backend-tvjb.onrender.com/notes/${noteId}`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setNotes((prevNotes) => {
          return {
            ...prevNotes,
            title: data.title,
            note: data.note,
            category: data.category,
          };
        });
      });
  }, []);

  const onChangeNotes = (event) => {
    const { name, value } = event.target;
    setNotes({
      ...notes,
      [name]: value,
    });
  };

  const handleUpdateNotes = () => {
    const payload = {
      title: notes.title,
      note: notes.note,
      category: notes.category,
    };

    fetch(`https://nem-backend-tvjb.onrender.com/notes/update/${noteId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        navigate("/notes");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div>Update Note Page</div>
      <div>
        <input
          type="text"
          placeholder="Enter Title"
          name="title"
          value={notes.title}
          onChange={onChangeNotes}
        />
        <input
          type="text"
          name="note"
          id="note"
          placeholder="Enter Note"
          value={notes.note}
          onChange={onChangeNotes}
        />
        <input
          type="text"
          placeholder="Enter Category"
          name="category"
          value={notes.category}
          onChange={onChangeNotes}
        />
        <button onClick={handleUpdateNotes}>Save Note</button>
      </div>
    </>
  );
};

export default UpdateNote;
