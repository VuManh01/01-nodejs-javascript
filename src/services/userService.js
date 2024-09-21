require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const createUserService = async (name, email, password) => {
  try {
    //check user exist
    const user = await User.findOne({ email });
    console.log(">>> check user:", user);
    if (user) {
      console.log(`>> user đã tồn tại, chọn 1 email khác: ${email}`);
      return null;
    }

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
      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (!isMatchPassword) {
        return {
          ErrorCode: 2,
          ErrorMessage: "Emiail/Password không hợp lệ ",
        };
      } else {
        //create an access token
        const payload = {
          email: user.email,
          name: user.name,
        };

        const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });
        return {
          ErrorCode: 0,
          access_token,
          user: {
            email: user.email,
            name: user.name,
          },
        };
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

const getUserService = async () => {
  try {
    let result = await User.find({});
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  createUserService,
  LoginService,
  getUserService,
};
