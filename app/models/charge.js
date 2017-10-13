'use strict'

const mongoose = require('mongoose')

const chargeSchema = new mongoose.Schema({
  stripeToken: {
    type: String,
    required: true
  },
  amount: {
    type: Number
  },
  description: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret, options) {
      const userId = (options.user && options.user._id) || false
      ret.editable = userId && userId.equals(doc._owner)
      return ret
    }
  }
})

const Charge = mongoose.model('Charge', chargeSchema)

module.exports = Charge
