const inventarioController = {};
const product = require('../Models/Product');
const productController = require('../Controllers/productController');
const supplierController = require('../Controllers/supplierController');
const pharmacyBranchController = require('../Controllers/pharmacyBranchController');
const productLocationController = require('../Controllers/productLocationController');
const {inventario,global, login, service,regular_expresion,mesages, form_group} = require('../propertis');


inventarioController.index = async(req, res) =>{
    const suppliers =await supplierController.findAll();
    const pharmacyBranchs = await pharmacyBranchController.findAll();
    const productLocations = await productLocationController.findAll();
    //const obtProduct = await product.getProduct(0,1,'7502225096866');
    //console.log(obtProduct);
    res.render('vipermedix/inventario',{inv:inventario,global,suppliers,pharmacyBranchs,productLocations});

}

inventarioController.getProduct = async(req,res)=>{
    const body = req.body;
    const products = await productController.getProduct(body.p_tipo,body.p_product_id,body.p_sucu_id,body.p_barcode);
    const successful = (products !==null) ? true:false;
    res.status(200).json({status:200, products,successful});
}
module.exports = inventarioController;