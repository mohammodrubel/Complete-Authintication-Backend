require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserProperty, createUser } = require("./user");
const error = require("../Utils/error");



const registerService = async ({ name, email, password }) => {
  let user = await findUserProperty("email", email);
  if (user) throw error("User already exists", 400);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return createUser({ name, email, password: hashedPassword });
};



// const loginService = async ({ email, password }) => {
//   const user = await findUserProperty("email", email);
//   if (!user) throw error("User not Found", 400);
//   const isValidPassword = await bcrypt.compare(password, user.password);
//   if (!isValidPassword) throw error("Invalid Password", 400);
//   const payload = {
//     _id: user._id,
//     name: user.name,
//     email: user.email,
//     roles: user.roles,
//     accountsStatus: user.accountsStatus,
//   };
//   return jwt.sign(payload, process.env.SECRET_KEY, {
//     expiresIn: "3h",
//   });
// };
const loginService = async ({ email, password }) => {
  const user = await findUserProperty("email", email);
  if (!user) throw new Error("User not Found", 400);
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new Error("Invalid Password", 400);
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accountsStatus: user.accountsStatus,
  };
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "3h",
  });
};










module.exports = {
  registerService,
  loginService,
};
