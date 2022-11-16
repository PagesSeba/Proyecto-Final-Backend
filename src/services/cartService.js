import logger from "../utils/loggers.js";
import cartDao from "../daos/cartDao.js";
import productDao from "../daos/productDao.js";
let instance = null;

class cartService {
  constructor() {
    this.cartDao = [];
  }
  static getInstance() {
    if (!instance) {
      instance = new cartService();
    }
    return instance;
  }

  async getAllCarts() {
    try {
      logger.info(`Se registra petición GET /api/carritos`);
      const carts = await cartDao.getAllCarts();
      logger.info(`Se obtienen carts`);
      return carts;
    } catch (err) {
      logger.error(`Error al obtener carts en service getAllCarts()`);
      throw err;
    }
  }

  async getCartById(id) {
    try {
      logger.info(`Se registra petición GET /api/carritos/${id}`);
      const cart = await cartDao.getCartById(id);
      logger.info(`Se obtiene cart`);
      return cart;
    } catch (err) {
      logger.error(`Error al obtener cart en service getCartById()`);
      throw err;
    }
  }

  async createCart(cart) {
    try {
      logger.info(`Se registra petición POST /api/carritos`);
      const newCart = await cartDao.createCart(cart);
      logger.info(`Se crea cart`);
      return newCart;
    } catch (err) {
      logger.error(`Error al crear cart en service createCart()`);
      throw err;
    }
  }

  async addProductToCart(id, idProduct) {
    try {
      logger.info(`Se registra petición POST /api/carritos/${id}/productos`);
      const cart = await cartDao.addProductToCart(id, idProduct);
      logger.info(`Se agrega producto al carrito`);
      const carrito = await cartDao.getCartById(id);
      const producto = await productDao.getProductById(idProduct);
      logger.info(`Se obtiene producto`);
      return { producto, carrito };
    } catch (err) {
      logger.error(
        `Error al agregar producto al carrito en service addProductToCart()`
      );
      throw err;
    }
  }

  async deleteCart(id) {
    try {
      logger.info(`Se registra petición DELETE /api/carritos/${id}`);
      const cart = await cartDao.deleteCart(id);
      logger.info(`Se elimina cart`);
      return cart;
    } catch (err) {
      logger.error(`Error al eliminar cart en service deleteCart()`);
      throw err;
    }
  }

  async removeProductFromCart(id, idProduct) {
    try {
      logger.info(
        `Se registra petición DELETE /api/carritos/${id}/productos/${idProduct}`
      );
      const productoEliminado = await productDao.getProductById(idProduct);
      const carrito = await cartDao.getCartById(id);
      const cart = await cartDao.removeProductFromCart(id, idProduct);
      logger.info(`Se elimina producto del carrito`);
      return { productoEliminado, carrito, cart };
    } catch (err) {
      logger.error(
        `Error al eliminar producto del carrito en service removeProductFromCart()`
      );
      throw err;
    }
  }

  async buyCart(id) {
    try {
      logger.info(`Se registra petición POST /api/carritos/${id}/comprar`);
      const cart = await cartDao.buyCart(id);
      logger.info(`Se comprueba carrito`);
      return cart;
    } catch (err) {
      logger.error(`Error al comprar carrito en service buyCart()`);
      throw err;
    }
  }
}
export default new cartService();
