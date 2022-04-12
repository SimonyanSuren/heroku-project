const jwt = require("jsonwebtoken");
const CustomError = require("../errors");

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.payload;
      return next();
    }
    next(new CustomError.UnauthenticatedError("Authentication Invalid"));
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticateUser };
