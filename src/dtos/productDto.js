let instance = null;
class productDto {
  constructor(
    timestamp,
    name,
    price,
    stock,
    description,
    image,
    url,
    code,
    category
  ) {
    this.timestamp = timestamp;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.description = description;
    this.image = image;
    this.url = url;
    this.code = code;
    this.category = category;
  }

  static getInstance() {
    if (!instance) {
      instance = new productDto();
    }
    return instance;
  }
}

export default new productDto();
