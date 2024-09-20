const User = require("../models/user");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const createUserService = async (name, email, password) => {
  try {
    //hash user password
    const hashPasword = await bcrypt.hash(password, saltRounds);
    //save user to database
    let result = await User.create({
      name: name,

      email: email,
      password: hashPasword,
      role: "HOIDANIT",
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
module.exports = {
  createUserService,
};
