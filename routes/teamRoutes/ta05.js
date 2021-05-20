//TA05 PLACEHOLDER
const express = require('express');
const router = express.Router();

const session = require('express-session');
router.use(session({secret: 'my secret', resave: false, saveUninitialized: false}));
const flash = require('connect-flash');
router.use(flash());

const ta05Controller = require('../../controllers/ta05');

router.get('/', ta05Controller.getIndex);

router.post('/change-style', ta05Controller.changeStyle);
router.post('/countDown', ta05Controller.countDown);
router.post('/countUp', ta05Controller.countUp);
router.post('/reset', ta05Controller.reset);

module.exports = router;