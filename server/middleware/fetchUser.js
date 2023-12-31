const jwt = require("jsonwebtoken");

require("dotenv").config();

const getUser = (req, res, next) => {
  const token = req.header("token");

  if (!token) {
    return res
      .status(401)
      .json({ error: "Please authenticate using a valid token." });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = { id: data.userId };
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = getUser;
