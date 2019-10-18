const Bootcamp = require('../models/Bootcamp');

/**
 * @desc    Get all bootcamps
 * @route   GET /api/v1/bootcamps
 * @access  Public
 */
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();

    res.status(200).json({
      status: true,
      message: 'Show all bootcamps',
      count: bootcamps.length,
      data: bootcamps
    });
  } catch (err) {
    res.status(400).json({
      status: false
    });
  }
};

/**
 * @desc    Get single bootcamp
 * @route   GET /api/v1/bootcamps/:id
 * @access  Public
 */
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({
        status: false
      });
    }

    res.status(200).json({
      status: true,
      message: `Show bootcamp ${req.params.id}`,
      data: bootcamp
    });
  } catch (err) {
    res.status(400).json({
      status: false
    });
  }
};

/**
 * @desc    Create new bootcamp
 * @route   POST /api/v1/bootcamps
 * @access  Private
 */
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      status: true,
      message: 'Create new bootcamp',
      data: bootcamp
    });
  } catch (err) {
    res.status(400).json({
      status: false
    });
  }
};

/**
 * @desc    Update existing bootcamp
 * @route   PUT /api/v1/bootcamps/:id
 * @access  Private
 */
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!bootcamp) {
      res.status(400).json({
        status: false
      });
    }

    res.status(200).json({
      status: true,
      message: `Update bootcamp ${req.params.id}`,
      data: bootcamp
    });
  } catch (err) {
    res.status(400).json({
      status: false
    });
  }
};

/**
 * @desc    Delete existing bootcamp
 * @route   PUT /api/v1/bootcamps/:id
 * @access  Private
 */
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      res.status(400).json({
        status: false
      });
    }

    res.status(200).json({
      status: true,
      message: `Delete bootcamp ${req.params.id}`,
      data: {}
    });
  } catch (err) {
    res.status(400).json({
      status: false
    });
  }
};
