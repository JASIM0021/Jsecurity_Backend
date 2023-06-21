const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.registerUser = async (req, res) => {
  const { username, email, password } = req?.body;
  if (![username, email, password].every(Boolean)) {
    return res.status(403).json({
      message: "Please Fill All Required Fields",
    });
  }

  const findUser = await User.findOne({ where: { email, username } });
  console.log("findUser", findUser);
  if (findUser) {
    return res.status(200).json({
      message: "User already exists",
      statusCode: 401,
    });
  }
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const users = await User.create({
    email,
    username,
    password: hashPassword,
  });
  return res.status(201).json({
    message: "user created successfully",
    statusCode: 200,
  });
};

exports.loginUser = async (req, res) => {
  const { email } = req?.body;

  if (![email, req?.body?.password].every(Boolean)) {
    return res.status(403).json({
      message: "Please Fill All Required Fields",
    });
  }
  try {
    const findUser = await User.findOne({
      where: { email },
      raw: true,
      nest: true,
    });

    // const {password,...hidePasswordUser}=findUser;

    if (!findUser) {
      return res.status(200).json({
        message: "User not found",
      });
    }
    const comparePassword = await bcrypt.compare(
      req?.body?.password,
      findUser?.password
    );
    if (!comparePassword) {
      return res.status(200).json({
        message: "Passwords do not match",
        statusCode: 400,
      });
    }
    const token = await jwt.sign(findUser, process.env.SECRET_TOKEN);
    return res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        user: findUser,
        token,
        message: "Login Successfull",
        statusCode: 200,
      });
  } catch (e) {
    console.log("e", e);
  }
};

exports.logout = async (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json({ message: "Logout successfully", statusCode: 200 });
};
