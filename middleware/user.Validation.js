const joi = require("joi");

const userValidate = (data) => {
  const userSchema = joi.object({
    username: joi.string().min(3).max(32).required(),
    password: joi.string().required(),
  });

  return userSchema.validate(data);
};

module.exports = {
  userValidate,
};
