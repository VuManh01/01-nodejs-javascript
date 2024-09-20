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

const LoginService = async (email1, password) => {
  try {
    //fetch user by email
    const user = await User.findOne({ email: email1 });
    if (user) {
      //compare password
      console.log(">> check user:", user);
      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (!isMatchPassword) {
        return {
          ErrorCode: 2,
          ErrorMessage: "Emiail/Password không hợp lệ ",
        };
      } else {
        //create an access token
        return "creat an access token";
      }
    } else {
      return {
        ErrorCode: 1,
        ErrorMessage: "Emiail/Password không hợp lệ ",
      };
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
module.exports = {
  createUserService,
  LoginService,
};
