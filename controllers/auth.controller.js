const { hash, genSalt, compareSync } = require("bcrypt");
const { User } = require("../models");
const UnauthenticatedError = require("../errors/unauthenticated.error");
const { sign } = require("jsonwebtoken");

exports.register = async (req, res, next) => {
    const { name, email, password, username, phoneNumber, role, address } = req.body;
  
    try {
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);
      const user = await User.create({
        name,
        username,
        email,
        password: hashedPassword,
        phoneNumber,
        role,
        address,
      });
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email) throw new UnauthenticatedError("Invalid email or password");
    if (!password) throw new UnauthenticatedError("Invalid email or password");

    const user = await User.findOne({
      where: { email },
    });


    if (!user) throw new UnauthenticatedError("Invalid email or password");

    if (!compareSync(password, user.password)) {
      throw new UnauthenticatedError("Invalid email or password");
    }

    const payload = {
      name: user.name,
      email: user.email,
      role: user.role,
    };
    
    const token = sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};