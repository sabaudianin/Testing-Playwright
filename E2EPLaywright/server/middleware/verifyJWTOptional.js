import pkg from "jsonwebtoken";

const { verify } = pkg;

export function verifyJWTOptional(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (
    !authHeader ||
    !authHeader?.startsWith("Token ") ||
    !authHeader.split(" ")[1].length
  ) {
    req.loggedin = false;

    return next();
  }

  const token = authHeader.split(" ")[1];

  verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.loggedin = true;
    req.userId = decoded.user.id;
    req.userEmail = decoded.user.email;
    req.userHashedPwd = decoded.user.password;
    next();
  });
}
