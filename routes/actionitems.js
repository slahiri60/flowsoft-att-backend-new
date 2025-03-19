const express = require('express');
const {
  getActionitems,
  getActionitem,
  createActionitem,
  updateActionitem,
  deleteActionitem,
  actionitemsSearch,
} = require('../controllers/actionitems');

const router = express.Router();

router.route('/').get(getActionitems).post(createActionitem);

router
  .route('/:id')
  .get(getActionitem)
  .put(updateActionitem)
  .delete(deleteActionitem);

router.route('/search/:keyword').get(actionitemsSearch);

module.exports = router;
