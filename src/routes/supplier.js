const supplierController = require('../Controllers/supplierController');
const express =    require('express');
const router = express.Router();

router.get('/',supplierController.index);
router.get('/findAll',supplierController.findAll);
router.get('/getSuppliers/:p_tipo/:p_supplier_id/:p_supplierName',supplierController.getSuppliers);

module.exports = router;