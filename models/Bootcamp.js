const mongoose = require('mongoose');

const bootcampSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
      trim: true,
      maxlength: [50, `Name can't be more than 50 characters`]
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [500, `Name can't be more than 50 characters`]
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        'Please use a valid URL with HTTP or HTTPS'
      ]
    },
    phone: {
      type: String,
      maxlength: [20, `Phone number can't be longer than 20 characters`]
    },
    email: {
      type: String,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email']
    },
    address: {
      type: String,
      required: [true, 'Address is required']
    },
    location: {
      /**
       * GeoJSON Point
       */
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: {
        type: [Number],
        index: '2dshpere'
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    },
    careers: {
      /**
       * Array of string
       */
      type: [String],
      required: true,
      enum: [
        'Web Development',
        'Mobile Development',
        'UI/UX',
        'Data Science',
        'Business',
        'Other'
      ]
    },
    averageRating: {
      type: Number,
      min: [1, 'Rating must be atleast 1'],
      max: [10, `Rating can't be more than 10`]
    },
    averageCost: Number,
    photo: {
      type: String,
      default: 'no-photo.jpg'
    },
    housing: {
      type: Boolean,
      default: false
    },
    jobAssistance: {
      type: Boolean,
      default: false
    },
    jobGuarantee: {
      type: Boolean,
      default: false
    },
    acceptGi: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Bootcamp', bootcampSchema);
