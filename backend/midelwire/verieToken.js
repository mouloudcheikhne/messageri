require("dotenv").config();
const jwt = require("jsonwebtoken");
const verifie = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Not authorized" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCES_TOKEN, (err, decode) => {
    if (err) {
      return res.status(403).json({ message: "Not authorized" });
    }

    req.user = decode.UserInfos.userID;
    next();
  });
};

module.exports = verifie;
