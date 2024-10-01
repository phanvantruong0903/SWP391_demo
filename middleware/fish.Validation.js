const joi = require("joi");

const koiValidate = (data) => {
  const fishSchema = joi.object({
    breed: joi.string().min(3).max(20).required(),
    origin: joi.string().required(),
    age: joi.number().required(),
    gender: joi.string().required(),
    size: joi.number().greater(10).less(100),
    description: joi.string().max(128),
    personality: joi.string().required(),
    dailyFoodAmount: joi.number().positive(),
    filteringRadio: joi.string().required(),
    certificate: joi.string().optional(),
    price: joi.number().positive().required(),
  });

  return fishSchema.validate(data);
};

module.exports = {
  koiValidate,
};
