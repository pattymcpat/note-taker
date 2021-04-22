const express = require("express");
const path = require("path");
const fs = require("fs");
const mainDir = path.join(__dirname, "/public");
const port = 3000;
const app = express();

app.use(express.json());

app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));

app.get("/notes", function(req, res) {
    res.sendFile(path.join(mainDir, "notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(mainDir, "index.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("/api/notes/:id", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
});

app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    
    let noteID = (savedNotes.length).toString();
    newNote.id = noteID;
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log(`Note saved...Content: , ${newNote}`);
    res.json(savedNotes);
})


app.listen(port, function() {
    console.log(`application listening on port ${port}`);
})