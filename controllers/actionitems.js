const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Actionitem = require('../models/Actionitem');

// @desc    Get all actionitems
// @route   GET /api/v1/actionitems
// @access  Private
exports.getActionitems = asyncHandler(async (req, res, next) => {
  let query;

  // Copy request query
  const reqQuery = { ...req.query };

  // Fields to exclude from filtering
  const removeFields = ['select', 'sort', 'page', 'limit'];
  removeFields.forEach((param) => delete reqQuery[param]);

  // Process filter parameters
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, $lt, $lte, $in, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Get base query
  query = Actionitem.find(JSON.parse(queryStr));

  // Process custom filters

  // Process criticality filters
  if (req.query.criticality) {
    const criticalitys = Array.isArray(req.query.criticality)
      ? req.query.criticality
      : [req.query.criticality];

    // Use $in operator to match any of the selected criticalitys
    query = query.find({
      criticality: { $in: criticalitys },
    });
  }

  // Process importance filters
  if (req.query.importance) {
    const importances = Array.isArray(req.query.importance)
      ? req.query.importance
      : [req.query.importance];

    // Use $in operator to match any of the selected importances
    query = query.find({
      importance: { $in: importances },
    });
  }

  // Process status filters
  if (req.query.status) {
    const statuss = Array.isArray(req.query.status)
      ? req.query.status
      : [req.query.status];

    // Use $in operator to match any of the selected statuss
    query = query.find({
      status: { $in: statuss },
    });
  }

  console.log('query after filtering: ' + query);

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 100;
  const skip = (page - 1) * limit;

  query = query.sort({ _id: 1 }).skip(skip).limit(limit);

  const actionitems = await query;

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

// @desc    Get all searched actionitems
// @route   GET /api/v1/actionitems/search/:keyword
// @access  Private
exports.actionitemsSearch = asyncHandler(async (req, res, next) => {
  const { keyword } = req.params;
  const actionitems = await Actionitem.find({
    $or: [
      { summary: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
    ],
  });

  res.status(200).json({
    success: true,
    count: actionitems.length,
    data: actionitems,
  });
});
