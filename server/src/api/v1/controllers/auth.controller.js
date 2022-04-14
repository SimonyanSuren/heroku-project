const AuthServices = require('../services/auth.service');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  AuthServices.register({ name, email, password })
    .then(() => {
      res.status(StatusCodes.CREATED).json({
        msg: "Success! Please check your email to verify account",
      });
    })
    .catch((err) => next(err));
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  AuthServices.login({ email, password })
    .then((result) => {
      const { user, token } = result;
      res.status(StatusCodes.OK).json({ user, token });
    })
    .catch((err) => next(err));
};

const logout = async (req, res, next) => {
  try {
    req.user = null;
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  const { vToken, email } = req.query;
  AuthServices.verifyEmail({ vToken, email })
    .then(() => {
      res
        .status(StatusCodes.OK)
        .redirect('http://localhost:3000/login?verified');
    })
    .catch((err) => next(err));
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  AuthServices.forgotPassword(email)
    .then(() => {
      res.status(StatusCodes.OK).json({ msg: "success" });
    })
    .catch((err) => next(err));
};

const resetPassword = async (req, res, next) => {
  const { token, email, password } = req.body;
  AuthServices.resetPassword({ token, email, password })
    .then(() => {
      res.status(StatusCodes.OK).json({ msg: "success" });
    })
    .catch((err) => next(err));
};

const changePassword = async (req, res, next) => {
  const { email, password, newPassword, token } = req.body;

  AuthServices.changePassword({ email, password, newPassword, token })
    .then(() => {
      res.status(StatusCodes.OK).json({ msg: "Password changed" });
    })
    .catch((err) => next(err));
};

const uploadFile = async (req, res, next) => {
  try {
    const photoData = await AuthServices.uploadFile(req, res);
    res.send({ msg: "successfully added", photoData });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  changePassword,
  uploadFile,
};
