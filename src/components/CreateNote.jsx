import React, { useState } from "react";

export const CreateNote = () => {
  const [notes, setNotes] = useState({
    title: "",
    note: "",
    category: "",
  });

  const onChangeNotes = (event) => {
    const { name, value } = event.target;
    setNotes({
      ...notes,
      [name]: value,
    });
  };

  const handleSaveNotes = () => {
    const payload = {
      title: notes.title,
      note: notes.note,
      category: notes.category,
    };

    console.log("payload:", payload);

    fetch("https://nem-backend-tvjb.onrender.com/notes/create", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Authorization: localStorage.getItem("token"), // Direct token usage without "Bearer"
        "Content-Type": "application/json", // Corrected Content-Type
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);
      })
      .catch((error) => {
        console.log("Fetch error:", error.message); // Improved error message
      });
  };

  return (
    <>
      <div>Create Note Page</div>
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
        <button onClick={handleSaveNotes}>Add Note</button>
      </div>
    </>
  );
};
