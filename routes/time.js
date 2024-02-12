const express = require('express');

const router = express.Router();
const timeCtrl = require('../controllers/time');


router.get('/:date?', timeCtrl.getTime);

router.post('/:date?', timeCtrl.postTime);

module.exports = router;
