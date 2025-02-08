import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../utils/config.js";
const authenticateToken = (req, res, next) => {
  // const authHeader = req.headers["authorization"];
  // const accessToken = authHeader && authHeader.split(" ")[1];

  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res
      .status(401)
      .json({ message: "Unauthorized | Akses token tidak tersedia" });
  }

  jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err || !user) {
      return res.status(403).json({ message: "Forbidden | Token tidak valid" });
    }

    req.user = user;
    next();
  });
};

export default authenticateToken;
