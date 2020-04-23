const mongoose = require('mongoose')
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
    default: '',
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  quoteList: [
    {
      gallons: {
        type: Number,
        required: true,
      },
      deliveryAddress: {
        type: String,
        readOnly: true,
        required: true,
      },
      deliveryAddress2: {
        type: String,
        default: '',
      },

      deliveryDate: {
        type: Date,
        required: true,
      },
      suggestedPrice: {
        type: Number,
        readOnly: true,
      },
      totalPrice: {
        type: Number,
        readOnly: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)
