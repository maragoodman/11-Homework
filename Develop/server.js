const express = require("express");
const path = require("path");
const db = require("./db/db.json");
const fs = require("fs");

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/notes", function (req, res) {
  res.json(db);
});

app.post("/api/notes", function (req, res) {
  var note = req.body;
  fs.readFile("./db/db.json", function (err, data) {
    if (err) throw err;
    var newArr = JSON.parse(data);
    note["id"] = newArr.length;
    newArr.push(note);

    var newFile = JSON.stringify(newArr);

    fs.writeFile("./db/db.json", newFile, function (err) {
      if (err) throw err;
      return data;
    });
    res.json(db);
  });
});

app.delete("/api/notes/:id", function (req, res) {
  var deleteNote = req.params.id;
  var arr = db;
  for (var i = 0; i < arr.length; i++) {
    if (deleteNote == arr[i].id) {
      arr.splice(i, 1);
      return arr;
    }

    var rewrite = JSON.stringify(arr);
    fs.writeFile("./db/db.json", rewrite, function (err) {
      if (err) throw err;
      console.log("deleted");
    });
  }
});

app.listen(PORT, () => {
  console.log("Listening...");
});
