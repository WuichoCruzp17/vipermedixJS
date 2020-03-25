const inventarioController = {};
const product = require('../Models/Product');
const productController = require('../Controllers/productController');
const supplierController = require('../Controllers/supplierController');
const pharmacyBranchController = require('../Controllers/pharmacyBranchController');
const productLocationController = require('../Controllers/productLocationController');
const productExpiryController = require('../Controllers/productExpiryController');
const productInventroyController = require('../Controllers/productInventroyController');
const {inventario,global, login, service,regular_expresion,mesages, form_group} = require('../propertis');


inventarioController.index = async(req, res) =>{
    const suppliers =await supplierController.findAll();
    const pharmacyBranchs = await pharmacyBranchController.findAll();
    res.render('vipermedix/inventario',{inv:inventario,global,suppliers,pharmacyBranchs});

}

inventarioController.getProduct = async(req,res)=>{
    const body = req.body;
    var productsLocations = null;
    const products = await productController.getProduct(body.p_tipo,body.p_product_id,body.p_sucu_id,body.p_barcode);
    const cols ={id:'Id',location:'Location'};
    if(products !== null){
        console.log(products);
        productsLocations = await productLocationController.findByProperty(inventario.frm_sucu,products.data[0][inventario.frm_sucu], cols);
    }
     
    const successful = (products !==null && productsLocations !== null) ? true:false;
    res.status(200).json({status:200, products,productsLocations,successful});
}

inventarioController.saveProductExpiry  = async(req,res)=>{
    const body = req.body;
    console.log(body);
    if(body!== null && body !== undefined){
        if(body.hasOwnProperty('model') && body.hasOwnProperty('lotes')){
            if(body.model.hasOwnProperty(inventario.frm_preC) && body.model.hasOwnProperty(inventario.frm_preP) && 
               body.model.hasOwnProperty(inventario.frm_ubi) && body.model.hasOwnProperty(inventario.frm_pro) &&
               body.model.hasOwnProperty(inventario.frm_stckA) && body.model.hasOwnProperty(inventario.frm_cantAd) &&
               Array.isArray(body.lotes)
               ){
                    var result = null;
                    var  c =0;
                    const resul =await productController.updateProdctForBill(body.model);
                    console.log("Respuesta-->",resul);
                    if(body.lotes.length>0){
                        for(var i = 0;i<body.lotes.length;i++){
                            var fechaArray =  body.lotes[i][inventario.frm_cadl].split(" ");
                            body.lotes[i][inventario.frm_cadl] = new Date(parseInt(fechaArray[2]),getFecha(fechaArray[1]),parseInt(fechaArray[0]));
                           result = await productExpiryController.save(
                                    {
                                        discontinuedDate:new Date(body.lotes[i][inventario.frm_cadl]),
                                        productId:body.model[inventario.frm_prodId],
                                        pharmacyBranchId:body.model[inventario.frm_sucu],    
                                        lotNumber:body.lotes[i][inventario.frm_lote]
                                    });
                            if(result === null){
                                res.status(200).json({status:500,successful:false, error:'Error en el servidor'});
                                break;
                            }else{
                                c++;
                            }
                        }

                        if(c==body.lotes.length){
                            body.model[inventario.frm_stckA] =parseInt(body.model[inventario.frm_stckA]) +c;
                            //const resultPIn = productInventroyController.update({productInventoryId:body.model[inventario.frm_prdIn], unitsInStock:body.model[inventario.frm_stckA]});
                            res.status(200).json({status:200, successful:true});
                        }else{
                            res.status(200).json({status:500, successful:false, error:'Error en el servidor'});
                        }

                    }else{
                        //Sin  lotes
                        res.status(200).json({status:500, successful:false, error:'No se encontraron lotes'});
                    }
               }else{
                   //Error en el formulario
                   res.status(200).json({status:500, successful:false, error:'No se enontro información'});
               }
        }
    }
};

function getFecha(mes){
    const monthsAbbr = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    var i =0;
    for(i;i<monthsAbbr.length;i++){
        if(monthsAbbr[i] == mes){
            break;
        }
    }
    return i;
}

module.exports = inventarioController;