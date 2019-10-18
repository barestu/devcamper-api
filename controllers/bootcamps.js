const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Bootcamp = require('../models/Bootcamp');

/**
 * @desc    Get all bootcamps
 * @route   GET /api/v1/bootcamps
 * @access  Public
 */
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();

  res.status(200).json({
    status: true,
    message: 'Show all bootcamps',
    count: bootcamps.length,
    data: bootcamps
  });
});

/**
 * @desc    Get single bootcamp
 * @route   GET /api/v1/bootcamps/:id
 * @access  Public
 */
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp ${req.params.id} not found`, 404));
  }

  res.status(200).json({
    status: true,
    message: `Show bootcamp ${req.params.id}`,
    data: bootcamp
  });
});

/**
 * @desc    Create new bootcamp
 * @route   POST /api/v1/bootcamps
 * @access  Private
 */
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    status: true,
    message: 'Create new bootcamp',
    data: bootcamp
  });
});

/**
 * @desc    Update existing bootcamp
 * @route   PUT /api/v1/bootcamps/:id
 * @access  Private
 */
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp ${bootcampId} not found`, 404));
  }

  res.status(200).json({
    status: true,
    message: `Update bootcamp ${req.params.id}`,
    data: bootcamp
  });
});

/**
 * @desc    Delete existing bootcamp
 * @route   PUT /api/v1/bootcamps/:id
 * @access  Private
 */
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp ${bootcampId} not found`, 404));
  }

  res.status(200).json({
    status: true,
    message: `Delete bootcamp ${req.params.id}`,
    data: {}
  });
});
