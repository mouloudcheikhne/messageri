const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const regester = async (req, res) => {
  const { nom, prenom, email, password } = req.body;
  if (!nom || !prenom || !email || !password) {
    return res.status(401).json({ message: "the fields are empty" });
  }
  const userfound = await User.findOne({ email: email });
  if (userfound)
    return res.status(401).json({ message: "user already exixte" });
  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({
    nom,
    email,
    prenom,
    password: passwordHash,
  });
  return res.status(200).json({ message: "user regester" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(401).json("the fields are empty");
  const userFound = await User.findOne({ email });
  if (!userFound) return res.status(401).json({ message: "user not found" });
  const verifie = await bcrypt.compare(password, userFound.password);
  if (!verifie)
    return res.status(401).json({ message: "email or password pas corecte" });
  const token = jwt.sign(
    {
      UserInfos: {
        userID: userFound._id,
        useremail: userFound.email,
      },
    },
    process.env.ACCES_TOKEN,
    { expiresIn: "15m" }
  );
  const refrech_token = jwt.sign(
    {
      UserInfos: {
        userID: userFound._id,
        useremail: userFound.email,
      },
    },
    process.env.REFRECH_TOKEN,
    { expiresIn: "7d" }
  );
  res.cookie("jwt", refrech_token, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "None",
  });
  return res.json({ userFound: userFound, token: token });
};
module.exports = { regester, login };
