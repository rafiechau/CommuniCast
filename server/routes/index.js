const { Router } = require("express");
const authRoute = require("./authRoute");

const router = Router();

router.use("/user", authRoute);

module.exports = router;
