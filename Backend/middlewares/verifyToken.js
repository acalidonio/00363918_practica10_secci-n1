// middlewares/verifyToken.js
import pkg from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";

const { verify } = pkg;

const JWT_SECRET = SECRET_KEY;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Token no enviado o con formato incorrecto" });
  }

  const token = authHeader.split(" ")[1];
  verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido" });
    req.user = user;
    next();
  });
};

export default verifyToken;
