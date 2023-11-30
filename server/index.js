require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const routes = require('./routers/index');
// const { handleNotFound } = require('./helpers/handleResponseHelper');


app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"))
app.use('/api', routes);

// app.all('*', (req, res) => {
//   return handleNotFound(res)
// });

app.listen(process.env.APP_PORT, () => {
  console.log(`🚀 Server running on port ${process.env.APP_PORT}`);
});
