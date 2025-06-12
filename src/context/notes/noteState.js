import { useState } from "react";
import React from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
  {
    "_id": "68491976d8a09f87da9bb4b9",
    "user": "684912c2d8a09f87da9bb4ae",
    "title": "my title",
    "description": "mari Icha",
    "tag": "personal",
    "date": "2025-06-11T05:51:50.824Z",
    "__v": 0
  }
];  
const [notes, setNotes] = useState(notesInitial);
    return (
        <noteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </noteContext.Provider> 
    );
}
export default NoteState;