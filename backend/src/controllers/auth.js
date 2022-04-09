const validate = require("../utils/validations");
const validations = require("../utils/validations/auth");
const authService = require("../services/mogno/auth");

async function register(req, res) {
  const cleanFields = await validate(validations.registerSchema, req.body);
  const user = await authService.saveUser(cleanFields);
  console.log("user: ", user);
  res.send({ message: "Successfully user is registered" });
}

async function login(req, res) {
  const cleanFields = await validate(validations.loginSchema, req.body);
  const user = await authService.login(cleanFields);

  const userFields = user.excludePasswordField();
  const token = user.generateToken();
  res.send({ user: { ...userFields, token, id: userFields._id } });
}

module.exports = { register, login };
