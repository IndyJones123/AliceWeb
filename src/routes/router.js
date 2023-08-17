const express = require('express');
const { getGame } = require('../controllers/profile');


router.get('/ListGame', getGame);

module.exports = router;