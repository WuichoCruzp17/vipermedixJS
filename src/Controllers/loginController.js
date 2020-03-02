const {inventario,global, login, service,regular_expresion,mesages, form_group} = require('../propertis');
const loginController ={};

loginController.index=async (req, res)=>{
    res.render('login',{login});  
};

module.exports = loginController;
