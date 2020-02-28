const express =    require('express');
const router = express.Router();
const inventarioController = require('../Controllers/inventarioController');
router.get('/', inventarioController.index);
router.get('/getProduct',inventarioController.getProduct);
module.exports = router;