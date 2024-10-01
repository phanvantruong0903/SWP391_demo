const createError = require("http-errors");

const { koiValidate } = require("../middleware/fish.Validation");
const Koi = require("../models/koi.model");

const koiController = {
  createKoi: async (req, res, next) => {
    try {
      const {
        breed,
        origin,
        age,
        gender,
        size,
        description,
        personality,
        dailyFoodAmount,
        filteringRadio,
        certificate,
        price,
      } = req.body;
      const { error } = koiValidate(req.body);

      if (error) {
        throw createError.BadRequest(error.details[0].message);
      }

      const newKoi = new Koi({
        breed,
        origin,
        age,
        gender,
        size,
        description,
        personality,
        dailyFoodAmount,
        filteringRadio,
        certificate,
        price,
      });

      const savedKoi = await newKoi.save();

      return res.json({
        status: 200,
        element: savedKoi,
      });
    } catch (error) {
      next(error);
    }
  },

  updateKoi: async (req, res, next) => {
    try {
      const { error } = koiValidate(req.body);

      if (error) {
        throw createError.BadRequest(error.details[0].message);
      }

      const updateKoi = await Koi.findByIdAndUpdate(req.body._id, req.body);

      return res.json({
        status: 200,
        element: updateKoi,
      });
    } catch (error) {
      next(error);
    }
  },

  updateStatus: async (req, res, next) => {
    try {
      const { _id } = req.body._id;
      const koi = await Koi.findById(_id)

      koi.status = !koi.status
      await koi.save()

      res.json({
        status: 200,
        element: koi
      })
    } catch (error) {
      next(error)
    }
  },
};

module.exports = koiController;
