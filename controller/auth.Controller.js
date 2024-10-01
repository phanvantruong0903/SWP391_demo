const createError = require("http-errors");

const User = require("../models/user.model");
const { userValidate } = require("../middleware/user.Validation");
const {
  signInAccessToken,
  signInRefreshToken,
} = require("../utils/JWT_services");

const authController = {
  registerUser: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const { error } = userValidate(req.body);

      if (error) {
        throw createError.BadRequest(error.details[0].message);
      }

      const isExist = await User.findOne({
        username: username,
      });

      if (isExist) {
        console.log(isExist);
        throw createError.Conflict(`${username} is already existed`);
      }

      const newUser = new User({
        username,
        password,
      });

      const savedUser = await newUser.save();

      return res.json({
        status: 200,
        element: savedUser,
      });
    } catch (error) {
      next(error);
    }
  },
  authorizedUser: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const { error } = userValidate(req.body);

      if (error) {
        throw createError.BadRequest(error.details[0].message);
      }

      const user = await User.findOne({
        username: username,
      });

      if (!user) {
        throw createError.NotFound(
          "Email or Password is incorrect, please try again"
        );
      }

      const isValid = await user.isCheckPassword(password);

      if (!isValid) {
        throw createError.Unauthorized(
          "Email or Password is incorrect, please try again"
        );
      }

      const accessToken = await signInAccessToken(user._id);
      const refreshToken = await signInRefreshToken(user._id);

      res.json({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
