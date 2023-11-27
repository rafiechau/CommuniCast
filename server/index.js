require('dotenv').config()
const express = require("express");
const cors = require("cors");
const index = require("./routers/index");
const path = require('path')

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/upload", express.static(path.join(__dirname, "./upload")))
app.use(index);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});