const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const apiRouter = require("./routes/api");

const app = express();

require("./db");

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.listen(3000, () => {
  console.log("Sevidor eschucando en http://localhost:3000");
});
