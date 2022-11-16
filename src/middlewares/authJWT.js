import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Role from "../models/Role.js";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"] ;
    if (!token)
      return res.status(401).json({
        message: "No se encontró token de verificación",
      });
    const isValid = jwt.verify(token, process.env.SECRET);
    req.userId = isValid.id;
    const user = await User.findById(req.userId, { password: 0 });
    if (!user)
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    next();
  } catch (error) {
    return res.status(500).json({
      message: "No autorizado. Error al verificar token",
      error,
    });
  }
};

export const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user)
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    const roles = await Role.findById(user.roles[0]);
    if (roles.name !== "admin")
        return res.status(401).json({
            message: "No autorizado. No es un administrador",
        });
        next();      
  } catch (error) {
    return res.status(500).json({
      message: "Error al verificar permisos",
      error,
    });
  }
};
