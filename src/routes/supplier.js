const supplierController = require('../Controllers/supplierController');
const express =    require('express');
const router = express.Router();

router.get('/',supplierController.index);

module.exports = router;