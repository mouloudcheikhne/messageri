const express = require("express");
const router = express.Router();
const {
  addMessage,
  user_send_message,
  filter_message,
} = require("../controllers/message");
const verifie = require("../midelwire/verieToken");
router.post("/add", verifie, addMessage);
router.get("/users", verifie, user_send_message);
router.get("/messages/:email", verifie, filter_message);
module.exports = router;
