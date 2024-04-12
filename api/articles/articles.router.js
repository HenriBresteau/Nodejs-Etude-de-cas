const express = require("express");
const articlesController = require("./articles.controller");
const isAdmin = require("../../middlewares/isAdmin");
const router = express.Router();

router.post("/", articlesController.create);
router.put("/:id", isAdmin, articlesController.update);
router.delete("/:id", isAdmin, articlesController.delete);

module.exports = router;
