const ErrorResponse = require('../utils/errorResponse');
const Actionitem = require('../models/Actionitem');

// @desc    Get all actionitems
// @route   GET /api/v1/actionitems
// @access  Private
exports.getActionitems = async (req, res, next) => {
  try {
    const actionitems = await Actionitem.find();

    res.status(200).json({
      success: true,
      count: actionitems.length,
      data: actionitems,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single actionitem
// @route   GET /api/v1/actionitems/:id
// @access  Private
exports.getActionitem = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

// @desc    Create actionitem
// @route   POST /api/v1/actionitems
// @access  Private
exports.createActionitem = async (req, res, next) => {
  try {
    const actionitem = await Actionitem.create(req.body);

    res.status(201).json({
      success: true,
      data: actionitem,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update single actionitem
// @route   PUT /api/v1/actionitems/:id
// @access  Private
exports.updateActionitem = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

// @desc    Delete single actionitem
// @route   DELETE /api/v1/actionitems/:id
// @access  Private
exports.deleteActionitem = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
};
