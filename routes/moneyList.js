
const express = require('express');

const router = express.Router();
const moneyListCtrl = require('../controllers/moneyList');

router.get('/:date?', moneyListCtrl.get);


module.exports = router;
