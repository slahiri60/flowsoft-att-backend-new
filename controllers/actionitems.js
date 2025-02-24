const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Actionitem = require('../models/Actionitem');

// @desc    Get all actionitems
// @route   GET /api/v1/actionitems
// @access  Private
exports.getActionitems = asyncHandler(async (req, res, next) => {
  const actionitems = await Actionitem.find();

  res.status(200).json({
    success: true,
    count: actionitems.length,
    data: actionitems,
  });
});

// @desc    Get single actionitem
// @route   GET /api/v1/actionitems/:id
// @access  Private
exports.getActionitem = asyncHandler(async (req, res, next) => {
  const actionitem = await Actionitem.findById(req.params.id);

  if (!actionitem) {
    return next(
      new ErrorResponse(
        `Action Item not found with id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: actionitem,
  });
});

// @desc    Create actionitem
// @route   POST /api/v1/actionitems
// @access  Private
exports.createActionitem = asyncHandler(async (req, res, next) => {
  const actionitem = await Actionitem.create(req.body);

  res.status(201).json({
    success: true,
    data: actionitem,
  });
});

// @desc    Update single actionitem
// @route   PUT /api/v1/actionitems/:id
// @access  Private
exports.updateActionitem = asyncHandler(async (req, res, next) => {
  const actionitem = await Actionitem.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!actionitem) {
    return next(
      new ErrorResponse(
        `Action Item not found with id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: actionitem,
  });
});

// @desc    Delete single actionitem
// @route   DELETE /api/v1/actionitems/:id
// @access  Private
exports.deleteActionitem = asyncHandler(async (req, res, next) => {
  const actionitem = await Actionitem.findByIdAndDelete(req.params.id);

  if (!actionitem) {
    return next(
      new ErrorResponse(
        `Action Item not found with id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});
