const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body } = require('express-validator');

// route 1: Fetch all notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    // Fetch all notes logic here
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  }
  catch (error) {
    res.status(500).send("Internal Server Error");
  }
})

// route 2: Add a new note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
  body('title', 'Enter a valid title').isLength({ min: 3 }),
  body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {

  // Add a new note logic here
  const { title, description, tag } = req.body;
  try {
    const note = new Note({
      title, description, tag, user: req.user.id
    });
    const savedNote = await note.save();
    res.json(savedNote);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
})

// route 3: Update an existing note using: PUT "/api/notes/updatenote". Login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
  // Update an existing note logic here
  const { title, description, tag } = req.body;
  try {
    // Create a new note object
    const newNote = {};
    if (title) { newNote.title = title; }
    if (description) { newNote.description = description; }
    if (tag) { newNote.tag = tag; }

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found"); }

    // Check if the user is authorized to update the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json({ note });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
})

// route 4: Delete an existing note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  // Delete an existing note logic here
  try {
    // Find the note to be deleted
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found"); }

    // Check if the user is authorized to delete the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Delete the note
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ "Success": "Note has been deleted", note: note });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router