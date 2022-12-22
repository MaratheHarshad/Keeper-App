import React, { useState } from "react";
import AddCircleIcon from "@material-ui/icons/AddBox";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [state, setState] = useState();

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
    });

    event.preventDefault();
  }

  return (
    <div>
      <form className="create-note">
        {state && (
          <Zoom in={true}>
            <input
              name="title"
              onChange={handleChange}
              value={note.title}
              placeholder="Title"
              autoFocus
            />
          </Zoom>
        )}

        <textarea
          name="content"
          onClick={() => {
            setState(true);
          }}
          onFocus={() => {
            setState(true);
          }}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={state ? 3 : 1}
        />
        <Zoom in={state}>
          <Fab onClick={submitNote}>
            <AddCircleIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
