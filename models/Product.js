const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  product: {
    type: String,
    deafult: 'Блок гранитный'
  },
  "arrival_date": {
    type: Date,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  length: {
    type: Number,
    default: null
  },
  width: {
    type: Number,
    default: null
  },
  height: {
    type: Number,
    default: null
  },
  "v_prov": {
    type: Number,
    default: null
  },
  volume: {
    type: Number,
    default: null
  },
  "v_base": {
    type: Number,
    default: null
  },
  "shipping_date": {
    type: Date,
    default: null
  },
  transport: {
    type: String,
    default: null
  },
  driver: {
    type: String,
    default: null
  },
  client: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  isShipped: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Products', ProductSchema);