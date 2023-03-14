const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const automobileSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    productionYear: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
automobileSchema.plugin(toJSON);
automobileSchema.plugin(paginate);

/**
 * @typedef Automobile
 */
const Automobile = mongoose.model('Automobile', automobileSchema);

module.exports = Automobile;
