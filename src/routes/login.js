const express =    require('express');
const router = express.Router();

const loginController = require('../Controllers/loginController');

router.get('/', loginController.index);

module.exports = router;
