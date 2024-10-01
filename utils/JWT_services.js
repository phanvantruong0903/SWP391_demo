const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const signInAccessToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userId,
    };
    const sercretKey = process.env.ACCESS_TOKEN_SECRET;
    const option = {
      expiresIn: "10m",
    };

    jwt.sign(payload, sercretKey, option, (error, token) => {
      if (error) {
        reject(error);
      }
      resolve(token);
    });
  });
};

const signInRefreshToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userId,
    };
    const sercretKey = process.env.REFRESH_TOKEN_SECRET;
    const option = {
      expiresIn: "1M",
    };

    jwt.sign(payload, sercretKey, option, (error, token) => {
      if (error) {
        reject(error);
      }
      resolve(token);
    });
  });
};

const verifyAccessToken = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return next(createError.Unauthorized());
  }
  const authHeaders = req.headers["authorization"];
  const bearerToken = authHeaders.split(" ");
  const token = bearerToken[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
    if (error) {
      if (error.name === "JsonWebTokenError") {
        return createError.Unauthorized();
      }
      return next(createError.Unauthorized(error.message));
    }
    req.payload = payload;
    next();
  });
};

const verifyRefreshToken = async (refreshToken) => {
  return new Promise((resolve, reject) => {
    console.log(refreshToken);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, payload) => {
        console.log(refreshToken);
        if (error) {
          console.log("loi verify");
          return reject(error);
        }
        resolve(payload);
      }
    );
  });
};

module.exports = {
  signInAccessToken,
  verifyAccessToken,
  signInRefreshToken,
  verifyRefreshToken,
};
