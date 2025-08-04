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
  //   {
  //   "userFound": {
  //     "_id": "688a7610897f3dfe7f63c449",
  //     "nom": "sidi",
  //     "prenom": "sidi",
  //     "email": "sidi@gmail.com",
  //     "password": "$2b$10$nXFzSottzAK1dfuVdIIQpeBzcMj7RMt2FXE55LMqCmDDC31/mdLPG",
  //     "role": "USER",
  //     "__v": 0
  //   },
  //   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mb3MiOnsidXNlcklEIjoiNjg4YTc2MTA4OTdmM2RmZTdmNjNjNDQ5IiwidXNlcmVtYWlsIjoic2lkaUBnbWFpbC5jb20ifSwiaWF0IjoxNzUzOTA5NzI5LCJleHAiOjE3NTM5MTA2Mjl9.IMqp9Z80dT6A7d-msSiQzaql1jpbgPC4-EobiAZsX-s"
  // }
  const resulta = {
    nom: userFound.nom,
    prenom: userFound.prenom,
    email: userFound.email,
    role: userFound.role,
    token,
  };
  return res.json(resulta);
};
const filter_with_email = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(401).json({ message: "the fields are empty" });
  const foundUser = await User.findOne({ email: email });
  if (!foundUser) return res.status(401).json({ message: "user not found" });
  const result = {
    nom: foundUser.nom,
    prenom: foundUser.prenom,
    email: foundUser.email,
  };
  return res.status(200).json(result);
};
module.exports = { regester, login, filter_with_email };
