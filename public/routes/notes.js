const notes = require("express").Router();
const { readFromFile, readAndAppend, writeToFile } = require("../helpers/fsUtils");
const { v4: uuidv4 } = require("uuid");

// GET Route for retrieving all the tips
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

 //POST Route for a new UX/UI tip
 notes.post("/", (req, res) => {

 const { title, text } = req.body;

 if (req.body) {
  const newNote = {
    title,
    text,
    id: uuidv4(),
    };

readAndAppend(newNote, "./db/notes.json");
res.json(`Note added successfully 🚀`);
} else {
res.error("Error in adding note");
 }
 });
//  Delete Route - similar to post
notes.delete("/:id", (req, res) => {
  const noteId = req.params.id;
  readFromFile("./db/notes.json").then((notes) => {
    const filteredNotes = notes.filter(note => note.id !== noteId);
    writeToFile(filteredNotes, "./db/notes.json").then(() => {
      res.json(filteredNotes);
    });
  });
});

module.exports = notes;
