let instance = null;
class cartDto {
  constructor(id, name, Date, user, products) {
    this.id = id;
    this.name = name;
    this.Date = Date;
    this.user = user;
    this.products = products;
  }

  static getInstance() {
    if (!instance) {
      instance = new cartDto();
    }
    return instance;
  }
}

export default new cartDto();
