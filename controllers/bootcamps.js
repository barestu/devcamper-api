/**
 * @desc    Get all bootcamps
 * @route   GET /api/v1/bootcamps
 * @access  Public
 */
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({
    status: true,
    message: 'Show all bootcamps',
    data: []
  });
};

/**
 * @desc    Get single bootcamp
 * @route   GET /api/v1/bootcamps/:id
 * @access  Public
 */
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    status: true,
    message: `Show bootcamp ${req.params.id}`,
    data: {}
  });
};

/**
 * @desc    Create new bootcamp
 * @route   POST /api/v1/bootcamps
 * @access  Private
 */
exports.createBootcamp = (req, res, next) => {
  res.status(201).json({
    status: true,
    message: 'Create new bootcamp',
    data: {}
  });
};

/**
 * @desc    Update existing bootcamp
 * @route   PUT /api/v1/bootcamps/:id
 * @access  Private
 */
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({
    status: true,
    message: `Update bootcamp ${req.params.id}`,
    data: {}
  });
};

/**
 * @desc    Delete existing bootcamp
 * @route   PUT /api/v1/bootcamps/:id
 * @access  Private
 */
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({
    status: true,
    message: `Delete bootcamp ${req.params.id}`
  });
};
