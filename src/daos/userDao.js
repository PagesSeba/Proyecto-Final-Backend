import logger from "../utils/loggers.js";
import  User  from "../models/User.js";
import userDto from "../dtos/userDto.js";
let instance = null;
class userDao {
  constructor() {
    this.listUsers = userDto;
  }
  static getInstance() {
    if (!instance) {
      instance = new userDao();
    }
    return instance;
  }

  async getAllUsers() {
    try {
      logger.info(`Se registra petición GET /users`);
      const users = await User.find({});
      logger.info(`Se obtienen users`);
      return users;
    } catch (err) {
      logger.error(`Error al obtener users`);
      throw err;
    }
  }

  async getUserById(id) {
    try {
      logger.info(`Se registra petición GET /users/${id}`);
      const user = await User.findById(id);
      logger.info(`Se obtiene user`);
      return user;
    } catch (err) {
      logger.error(`Error al obtener user`);
      throw err;
    }
  }

  async createUser(user) {
    try {
      logger.info(`Se registra petición POST /users`);
      const userCreado = await User.create({user: user});

      logger.info(`Se crea user`);
      return userCreado;
    } catch (err) {
      logger.error(`Error al crear user`);
      throw err;
    }
  }

  async updateUser(id, user) {
    try {
      logger.info(`Se registra petición PUT /users/${id}`);
      const userActualizado = await User.findByIdAndUpdate(id, user);
      logger.info(`Se actualiza user`);
      return userActualizado;
    } catch (err) {
      logger.error(`Error al actualizar user`);
      throw err;
    }
  }

  async deleteUser(id) {
    try {
      logger.info(`Se registra petición DELETE /users/${id}`);
      const userEliminado = await User.findByIdAndDelete(id);
      logger.info(`Se elimina user`);
      return userEliminado;
    } catch (err) {
      logger.error(`Error al eliminar user`);
      throw err;
    }
  }

  async getUserByEmail(email) {
    try {
      //logger.info(`Se registra petición GET /users/email/${email}`);
      const user = await User.findOne({ email });
      logger.info(`Se obtiene user`);
      return user;
    } catch (err) {
      logger.error(`Error al obtener user`);
      throw err;
    }
  }

  async getUserByUsername(username) {
    try {
      logger.info(`Se registra petición GET /users/username/${username}`);
      const user = await User.findOne({ username: username });
      logger.info(`Se obtiene user`);
      return user;
    } catch (err) {
      logger.error(`Error al obtener user`);
      throw err;
    }
  }

  async deleteUserByUsername(username) {
    try {
      logger.info(`Se registra petición DELETE /users/username/${username}`);
      const userEliminado = await User.findOneAndDelete({ username: username });
      logger.info(`Se elimina user`);
      return userEliminado;
    } catch (err) {
      logger.error(`Error al eliminar user`);
      throw err;
    }
  }

  async getUserImage(id) {
    try {
      logger.info(`Se registra petición GET /users/image/${id}`);
      const user = await User.findById(id);
      logger.info(`Se obtiene user`);
      return user.image;
    } catch (err) {
      logger.error(`Error al obtener user`);
      throw err;
    }
  }
}

export default new userDao();
