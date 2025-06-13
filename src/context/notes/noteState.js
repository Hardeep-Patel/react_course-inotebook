import { useState } from "react";
import React from "react";
import noteContext from "./noteContext";
import { data } from "react-router-dom";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [
    {
      _id: "68491976d8a09f87da9bb4b9",
      user: "684912c2d8a09f87da9bb4ae",
      title: "my title",
      description: "mari icha",
      tag: "personal",
      date: "2025-06-11T05:51:50.824Z",
      __v: 0,
    },
    {
      _id: "684ba2883e22cf497aab25b8",
      user: "684912c2d8a09f87da9bb4ae",
      title: "my title2",
      description: "mari icha he",
      tag: "personal",
      date: "2025-06-13T04:01:12.972Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);
  //Adding a note
  const addNote = (title, description, tag) => {
    const note = {
      _id: "684ba2883e22cf497aab25b8",
      user: "684912c2d8a09f87da9bb4ae",
      title: title,
      description: description,
      tag: tag,
      date: "2025-06-13T04:01:12.972Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  //Deleting a note
  const deleteNote = (id) => {
    console.log("Deleting a note" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //Editing a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg0OTEyYzJkOGEwOWY4N2RhOWJiNGFlIn0sImlhdCI6MTc0OTYxOTY0NX0.rdgJ2Nu96wR_uIcSjuc2ZivMkvh6iWbV51YVFLqGovk",
      },
      body: JSON.stringify(data),
    });
     return response.json();
    // Logic to edit a note
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  
  return (
    <noteContext.Provider value={{ notes, addNote, editNote, deleteNote }}>
      {props.children}
    </noteContext.Provider>
  )

} 
export default NoteState;
