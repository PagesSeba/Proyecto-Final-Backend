import productClass from "../class/classProduct.js";
const listProducts = await productClass.getAllProducts();
const allProducts = listProducts.map((producto) => {
  return {
    id: producto.id,
    name: producto.name,
    price: producto.price,
    stock: producto.stock,
    description: producto.description,
    url: producto.url,
    image: producto.image,
    category: producto.category,
    timestamp: producto.timestamp,
  };
});

export default allProducts;
