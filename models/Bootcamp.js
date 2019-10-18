const mongoose = require('mongoose');
const sluggify = require('slugify');
const geocoder = require('../utils/geocoder');

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

/**
 * Create bootcamp slug from the name
 */
bootcampSchema.pre('save', function(next) {
  this.slug = sluggify(this.name, { lower: true });
  next();
});

/**
 * Geocode & create location field
 */
bootcampSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.address);

  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    country: loc[0].countryCode,
    zipCode: loc[0].zipCode
  };

  // Do not save address in DB
  this.address = undefined;
  next();
});

module.exports = mongoose.model('Bootcamp', bootcampSchema);
