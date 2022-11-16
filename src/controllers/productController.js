import logger from "../utils/loggers.js";
import productService from "../services/productService.js";
import sharp from "sharp";
import fs from "fs";
let instance= null;

class productController {
  constructor() {
    this.productService = [];
  }

  static getInstance() {
    if(!instance) {
        instance = new productController()
    }
    return instance
}

  async getAllProducts(req, res) {
    try {
      logger.info(`Se registra petición GET /productos`);
      const productos = await productService.getAllProducts();
      logger.info(`Se obtienen productos`);
      res.status(200).json({ productos });
    } catch (err) {
      logger.error(`Error al obtener productos`);
      throw err;
    }
  }

  async createProduct(req, res) {
    try {
      logger.info(`Se registra petición POST /productos`);
      const productoCreado = await productService.createProduct(req.body);
      logger.info(`Se crea producto`);
      res.status(200).json({ productoCreado });
    } catch (err) {
      logger.error(`Error al crear producto`);
      throw err;
    }
  }

  async getProductById(req, res) {
    try {
      logger.info(`Se registra petición GET /productos/${req.params.id}`);
      const producto = await productService.getProductById(req.params.id);
      logger.info(`Se obtiene producto`);
      res.status(200).json({ producto });
    } catch (err) {
      logger.error(`Error al obtener producto`);
      throw err;
    }
  }

  async updateProduct(req, res) {
    try {
      logger.info(`Se registra petición PUT /productos/${req.params.id}`);
      const productoActualizado = await productService.updateProduct(
        req.params.id,
        req.body
      );
      logger.info(`Se actualiza producto`);
      res.status(200).json({ productoActualizado });
    } catch (err) {
      logger.error(`Error al actualizar producto`);
      throw err;
    }
  }

  async addImage(req, res){
    try {
      const image = req.file;
      const processImage = sharp(image.buffer);
      const data = await processImage.resize(200, 200).toBuffer();
      fs.writeFileSync(`avatar/products/${req.user.image}`, data);
      res.redirect("/api/productos"); 
    } catch (err) {
      logger.error(`Error al obtener user`);
      throw err;
    }
  }

  async deleteProduct(req, res) {
    try {
      logger.info(`Se registra petición DELETE /productos/${req.params.id}`);
      const productoEliminado = await productService.deleteProduct(req.params.id);
      logger.info(`Se elimina producto`);
      res.status(200).json({ productoEliminado });
    } catch (err) {
      logger.error(`Error al eliminar producto`);
      throw err;
    }
  }
}

export default new productController();
