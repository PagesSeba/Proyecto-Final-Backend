import logger from "../utils/loggers.js";
import cartService from "../services/cartService.js";
import productService from "../services/productService.js";
let instance= null;

/*===============[Datos necesarios para método buyCart]===============*/
import dotenv from "dotenv";
dotenv.config();
import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";
import  User  from "../models/User.js";
import sendMail from "../utils/messageEmailEthereal.js";
import sendEmailGoogle from "../utils/messageEmailGoogle.js";
const TEST_MAIL_ETHEREAL = process.env.TEST_MAIL_ETHEREAL;
const FROM_EMAIL_GOOGLE = process.env.FROM_EMAIL_GOOGLE;
class cartController {
  constructor() {
    this.cartService = [];
    this.productService = [];
  }
  static getInstance() {
    if(!instance) {
        instance = new cartController()
    }
    return instance
  }

  async getAllCarts(req, res) {
    try {
      logger.info(`Se registra petición GET /api/carritos`);
      const carritos = await cartService.getAllCarts();
      logger.info(`Se obtienen carts`);
      res.json({ carritos });
    } catch (err) {
      logger.error(`Error al obtener carts`);
      throw err;
    }
  }

  async getCartById(req, res) {
    try {
      logger.info(`Se registra petición GET /api/carritos/${req.params.id}`);
      const carrito = await cartService.getCartById(req.params.id);
      logger.info(`Se obtiene cart`);
      res.json({ carrito });
    } catch (err) {
      logger.error(`Error al obtener cart`);
      throw err;
    }
  }

  async getCartProducts(req, res) {
    try {
      logger.info(`Se registra petición GET 
            /api/carritos/${req.params.id}/productos`);
      const carrito = await cartService.getCartById(req.params.id);
      const productos = await Promise.all(
        carrito.products.map(async (product) => {
          return await productService.getProductById(product);
        })
      );
      logger.info(`Se obtiene cart`);
      res.json({ carrito, productos });
    } catch (err) {
      logger.error(`Error al obtener cart`);
      throw err;
    }
  }

  async createCart(req, res) {
    try {
      logger.info(`Se registra petición POST /api/carritos`);
      const carrito = await cartService.createCart(req.body);
      logger.info(`Se crea cart`);
      res.json({ carritoCreado: carrito });
      return carrito;
    } catch (err) {
      logger.error(`Error al crear cart`);
      throw err;
    }
  }

  async addProductToCart(req, res) {
    try {
      logger.info(`Se registra petición POST 
            /api/carritos/${req.params.id}/productos/${req.params.idProduct}`);
      const cart = await cartService.addProductToCart(
        req.params.id,
        req.params.idProduct
      );
      logger.info(`Se agrega producto al carrito`);
      res.json({ productoAgregado: cart });
      return cart;
    } catch (err) {
      logger.error(`Error al agregar producto al carrito`);
      throw err;
    }
  }

  async deleteCart(req, res) {
    try {
      logger.info(`Se registra petición DELETE /api/carritos/${req.params.id}`);
      const cart = await cartService.deleteCart(req.params.id);
      logger.info(`Se elimina cart`);
      res.json({ carritoEliminado: cart });
      return cart;
    } catch (err) {
      logger.error(`Error al eliminar cart`);
      throw err;
    }
  }

  async removeProductFromCart(req, res) {
    try {
      logger.info(
        `Se registra petición DELETE /api/carritos/${req.params.id}/productos/${req.params.idProduct}`
      );
      const cart = await cartService.removeProductFromCart(
        req.params.id,
        req.params.idProduct
      );
      logger.info(`Se elimina producto del cart`);
      res.json(cart);
      return cart;
    } catch (err) {
      logger.error(`Error al eliminar producto del cart`);
      throw err;
    }
  }

  async buyCart(req, res) {
    try {
      const cart = await Cart.findById(req.params.id);
      const user = await User.findById(req.params.idUser);
      const products = await Product.find({ _id: { $in: cart.products } });
      const total = products.reduce(
        (total, product) => total + product.price,
        0
      );
      const message = `Hola ${user.username}, tu compra ha sido realizada con éxito. Ver detalle >`;
      const detalle = `El total es de la compra es $ ${total}. Detalle de la compra: ${products
        .map((product) => `${product.name} - ${product.price}`)
        .join(", ")}`;
        sendMail(TEST_MAIL_ETHEREAL, message, detalle);
        sendEmailGoogle(FROM_EMAIL_GOOGLE, message, detalle);
      res.json({
        message: "Compra realizada con éxito",
        cart: cart,
        user: user,
        products: products,
        total: total,
      });
    } catch (error) {
      res.status(500).json({ message: "Error al realizar la compra" });
    }
  }
}

export default new cartController();
