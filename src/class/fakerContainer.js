import faker from "@faker-js/faker";

function generateRandomProduct(cant = 5) {
  let listProducts = [];
  for (let i = 0; i < Number(cant); i++) {
    const prod = {
      id: i + 1,
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      url: faker.image.transport(1234, 2345, true),
    };
    listProducts.push(prod);
  }
  return listProducts;
}

export default generateRandomProduct;
