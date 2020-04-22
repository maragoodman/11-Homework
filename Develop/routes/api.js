const db = require("..db/db.json");
const path = require("path");

module.exports = function (app) {
  //get notes
  app.get("/api/notes", (req, res) => {
    res.json(db);
  });
  //post notes
  app.post("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  //delete notes
  app.delete("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
