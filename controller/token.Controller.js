const createError = require("http-errors");
const {
  verifyRefreshToken,
  signInAccessToken,
  signInRefreshToken,
} = require("../utils/JWT_services");

const tokenController = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw createError.BadRequest();
    }
    const { userId } = await verifyRefreshToken(refreshToken);
    const accessToken = await signInAccessToken(userId);
    const refToken = await signInRefreshToken(userId);

    res.json({
      accessToken: accessToken,
      refreshToken: refToken,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = tokenController;
