const { registerService, loginService } = require("../Service/auth");

const registerUserPost = async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Invalid User" });
  }
  try {
    const user = await registerService({ name, email, password });
    res.status(201).json({ message: "User created Successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUserPost = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await loginService({ email, password });
    res.status(200).json({ message: "Login Successfully", token });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json({ message: errorMessage });
  }
};

module.exports = { registerUserPost, loginUserPost };
