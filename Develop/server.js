const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded());

// routes
apiRoutes(app);
htmlRoutes(app);

app.listen(PORT, () => {
  console.log("Listening..");
});
