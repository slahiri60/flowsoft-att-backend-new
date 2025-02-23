// @desc    Get all actionitems
// @route   GET /api/v1/actionitems
// @access  Private
exports.getActionitems = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: 'Show all action items', hello: req.hello });
};

// @desc    Get single actionitem
// @route   GET /api/v1/actionitems/:id
// @access  Private
exports.getActionitem = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Show action item ${req.params.id}` });
};

// @desc    Create actionitem
// @route   POST /api/v1/actionitems
// @access  Private
exports.createActionitem = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create new action item' });
};

// @desc    Update single actionitem
// @route   PUT /api/v1/actionitems/:id
// @access  Private
exports.updateActionitem = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update action item ${req.params.id}` });
};

// @desc    Delete single actionitem
// @route   DELETE /api/v1/actionitems/:id
// @access  Private
exports.deleteActionitem = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete action item ${req.params.id}` });
};
