const {
  regester,
  login,
  filter_with_email,
} = require("../controllers/UserController");
const express = require("express");
const verifie = require("../midelwire/verieToken");
const router = express.Router();
router.route("/regester").post(regester);
router.route("/login").post(login);
router.get("/provider", verifie, (req, res) => {
  return res.status(200).json({ userconect: req.user });
});
router.post("/get_user", verifie, filter_with_email);
module.exports = router;
