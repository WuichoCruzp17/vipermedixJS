const express =    require('express');
const router = express.Router();
const {isLoggedIn} = require('../lib/session');
const inventarioController = require('../Controllers/inventarioController');

router.get('/', inventarioController.index);
router.post('/getProduct', isLoggedIn, inventarioController.getProduct);
module.exports = router;