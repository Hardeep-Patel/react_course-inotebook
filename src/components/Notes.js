import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';

function Notes() {
     const context = useContext(noteContext);
    const { notes, setNotes } = context;
  return (
    <>
      <div className="container my-3">

      <h2>your notes</h2>
      {notes.map((note) => {
        return <Noteitem  note={note} />;
      })}
      </div>
    </>
  )
}

export default Notes
