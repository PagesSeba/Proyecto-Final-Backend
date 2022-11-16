import User from "../models/User.js";
import jwt from "jsonwebtoken";
import Role from "../models/Role.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;
    console.log(username
      , email
      , password
      , roles
      );
      const user = new User({
        username,
        email,
        password,
        roles
        });
    console.log(user);
    if (roles) {
      const role = await Role.find({ name: { $in: roles } });
      user.roles = role.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      user.roles = [role._id];
    }
    const newUser = await user.save();
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET, {
      expiresIn: 86400,
    });
    res.status(200).json({
      message: "Usuario creado con exito",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        roles: newUser.roles,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear usuario",
      error,
    });
  }
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).populate("roles");
  if (!user) {
    return res.status(401).json({
      message: "Usuario no encontrado",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: 86400,
  });
  
  res.status(200).json({
    message: "Usuario logeado con exito",
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles,
    },
  });
};
