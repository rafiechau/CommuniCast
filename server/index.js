require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routers/index");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/api", routes);

// app.all('*', (req, res) => {
//   return handleResponse(res, 404, { message: 'API Not Found' });
// });

app.listen(port, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
