const express = require("express");
const bodyParser = require("body-parser");
const projectRoutes = require("./routes/projectRoutes");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/project", projectRoutes);

app.get("/", (req, res) => {
  res.json("Connected to server");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
