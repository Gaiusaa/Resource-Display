const express = require("express");
const router = express.Router();

const pathController = require("../controllers/path");

router.get("/", pathController.renderPage);

module.exports = router;