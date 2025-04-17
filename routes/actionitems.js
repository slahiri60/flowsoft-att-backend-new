// routes/actionitem.js
const express = require('express');
const {
  getActionitems,
  getActionitem,
  createActionitem,
  updateActionitem,
  deleteActionitem,
  actionitemsSearch,
} = require('../controllers/actionitems');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, getActionitems).post(protect, createActionitem);

router
  .route('/:id')
  .get(protect, getActionitem)
  .put(protect, updateActionitem)
  .delete(protect, deleteActionitem);

router.route('/search/:keyword').get(protect, actionitemsSearch);

module.exports = router;
