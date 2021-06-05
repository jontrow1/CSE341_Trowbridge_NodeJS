const express = require('express');

const prove08Controller = require('./controllers/prove08');
const router = express.Router();

router.get('/', prove08Controller.processJson)
      .post('/', prove08Controller.getIndex)
      
module.exports = router;