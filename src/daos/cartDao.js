import logger from "../utils/loggers.js";
import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";
import { User } from "../models/User.js";
import moment from "moment";
import cartDto from "../dtos/cartDto.js";
let instance = null;
class cartDao {
  constructor() {
    // this.listProducts = [];
    this.listCarts = cartDto;
  }

  static getInstance() {
    if (!instance) {
      instance = new cartDao();
    }
    return instance;
  }

  async getAllCarts() {
    try {
      logger.info(`Se registra petición GET /api/carritos`);
      const carritos = await Cart.find({});
      logger.info(`Se obtienen carritos`);
      return carritos;
    } catch (err) {
      logger.error(`Error al obtener carts en dao getAllCarts()`);
      throw err;
    }
  }

  async getCartById(id) {
    try {
      logger.info(`Se registra petición GET /api/carritos/${id}`);
      const carrito = await Cart.findById(id);
      logger.info(`Se obtiene cart`);
      return carrito;
    } catch (err) {
      logger.error(`Error al obtener cart en dao getCartById()`);
      throw err;
    }
  }

  async getCartProducts(id) {
    try {
      logger.info(`Se registra petición GET /api/carritos/${id}/productos`);
      const cart = await Cart.findById(id);
      const products = await Promise.all(
        cart.products.map(async (product) => {
          return await Product.findById(product);
        })
      );
      logger.info(`Se obtienen products`);
      return products;
    } catch (err) {
      logger.error(`Error al obtener products en dao getCartProducts()`);
      throw err;
    }
  }

  async createCart(cart, user) {
    try {
      logger.info(`Se registra petición POST /api/carritos`);
      const carrito = await Cart.create(cart);
      logger.info(`Se crea cart`);
      const carritoCreado = {
        id: carrito._id,
        name: carrito.name,
        products: carrito.products,
        timestamp: moment(carrito.timestamp).format("L LTS"),
      };
      return carritoCreado;
    } catch (err) {
      logger.error(`Error al crear cart en dao createCart()`);
      throw err;
    }
  }

  async addProductToCart(id, idProduct) {
    try {
      logger.info(
        `Se registra petición POST /api/carritos/${id}/productos/${idProduct}`
      );
      const cart = await Cart.findById(id);
      const product = await Product.findById(idProduct);
      cart.products.push(product);
      cart.save((err, carrito) => {
        if (err) {
          logger.error(
            `Error al agregar producto al carrito en dao addProductToCart() método save()`
          );
          throw err;
        } else {
          logger.info(`Se agrega producto al carrito`);
          return carrito;
        }
      });
    } catch (err) {
      logger.error(
        `Error al agregar producto al carrito en dao addProductToCart()`
      );
      throw err;
    }
  }

  async removeProductFromCart(id, idProduct) {
    try {
      logger.info(
        `Se registra petición DELETE /api/carritos/${id}/productos/${idProduct}`
      );
      const cart = await Cart.findById(id);
      const product = await Product.findById(idProduct);
      cart.products.pull(product);
      cart.save((err, carrito) => {
        if (err) {
          logger.error(
            `Error al eliminar producto del carrito en dao removeProductFromCart() método save()`
          );
          throw err;
        } else {
          logger.info(`Se elimina producto del carrito`);
          return carrito;
        }
      });
    } catch (err) {
      logger.error(
        `Error al eliminar producto del carrito en dao removeProductFromCart()`
      );
      throw err;
    }
  }

  async updateCart(id, cart) {
    try {
      logger.info(`Se registra petición PUT /api/carritos/${id}`);
      const carrito = await Cart.findByIdAndUpdate(id, cart, { new: true });
      logger.info(`Se actualiza cart`);
      return carrito;
    } catch (err) {
      logger.error(`Error al actualizar cart en dao updateCart()`);
      throw err;
    }
  }

  async deleteCart(id) {
    try {
      logger.info(`Se registra petición DELETE /carts/${id}`);
      const cartEliminado = await Cart.findByIdAndDelete(id);
      logger.info(`Se elimina cart`);
      return cartEliminado;
    } catch (err) {
      logger.error(`Error al eliminar cart en dao deleteCart()`);
      throw err;
    }
  }

  async buyCart(id) {
    try {
      logger.info(`Se registra petición POST /api/carritos/${id}/comprar`);
      const cart = await Cart.findById(id);
      const products = await Promise.all(
        cart.products.map(async (product) => {
          return await Product.findById(product);
        })
      );
      const user = await User.findById(cart.user);
      const carrito = {
        id: cart._id,
        name: cart.name,
        user: user,
        products: products,
      };
      return carrito;
    } catch (err) {
      logger.error(`Error al comprar carrito en dao buyCart()`);
      throw err;
    }
  }
}

export default new cartDao();
