import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  useEffect(() => {
    fetch("http://localhost:2000", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => setNotes([...response]));
  }, []);

  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    fetch("http://localhost:2000", {
      method: "PUT",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((response) => response.json())
      .then((response) => setNotes([...response]));
  }

  function deleteNote(id) {
    fetch("http://localhost:2000", {
      method: "DELETE",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({ _id: id }),
    })
      .then((response) => response.json())
      .then((response) => setNotes([...response]));
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
