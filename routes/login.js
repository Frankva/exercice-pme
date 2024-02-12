const express = require('express');

const router = express.Router();
const loginCtrl = require('../controllers/login');


router.get('/', loginCtrl.getLogin);
router.post('/', loginCtrl.postLogin);

module.exports = router;
