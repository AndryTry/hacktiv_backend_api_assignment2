const { verify } = require("jsonwebtoken");
const { User } = require("../models");
const UnauthorizedError = require("../errors/unauthorized.error");

const auth = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) throw new UnauthorizedError("Please Login First!");
    const [type, token] = authorization.split(" ");
    
    const decoded = verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) throw new UnauthorizedError("User is not registered");
    req.user = user;
  } catch (error) {
    return res.status(401).json({ error: error.name, message: error.message });
  }

  next();
};

module.exports = auth;