import { Router } from "express";
import cartController from "../controllers/cartController.js";
const routeCart = Router();

/*============================[Rutas API: /api/carritos]============================*/
routeCart.get("/carritos", cartController.getAllCarts);
routeCart.get("/carritos/:id", cartController.getCartById);
routeCart.get("/carritos/:id/productos", cartController.getCartProducts);
routeCart.post("/carritos", cartController.createCart);
routeCart.post(
  "/carritos/:id/productos/:idProduct",
  cartController.addProductToCart
);
routeCart.delete("/carritos/:id", cartController.deleteCart);
routeCart.delete(
  "/carritos/:id/productos/:idProduct",
  cartController.removeProductFromCart
);
routeCart.get("/carritos/compra/:id/user/:idUser", cartController.buyCart);

export default routeCart;
