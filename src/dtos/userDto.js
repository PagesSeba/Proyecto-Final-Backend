let instance = null;
class userDto {
  constructor(
    name,
    lastName,
    address,
    age,
    phone,
    image,
    username,
    email,
    password
  ) {
    this.name = name;
    this.lastName = lastName;
    this.address = address;
    this.age = age;
    this.phone = phone;
    this.image = image;
    this.username = username;
    this.email = email;
    this.password = password;
  }
  static getInstance() {
    if (!instance) {
      instance = new userDto();
    }
    return instance;
  }
}

export default new userDto();
