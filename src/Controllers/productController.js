const product = require('../Models/Product');
const {inventario} = require('../propertis');
const productController ={};

productController.getProduct = async(p_tipo,p_product_id,p_sucu_id,p_barcode)=>{
    var rows = await product.executeStored('VIPPROCON',[p_tipo,p_product_id,p_sucu_id,p_barcode]);
    if(rows !==null && rows !==undefined){
        if(rows.hasOwnProperty('data')){
            return rows;
        }else{
            return null;
        }
        
    }else{
        return null;
    }
};

productController.updateProdctForBill = async(model)=>{

    const result =   await product.executeStored('spUpdate_Product_From_Bill',[
        model[inventario.frm_codiB],
        model[inventario.frm_cantAd],
        model[inventario.frm_preC],
        model[inventario.frm_preP],
        model[inventario.frm_lastPro],
        model.locationString,
        model[inventario.frm_anti],
        parseInt(model[inventario.frm_sucu])
    ]);
    return result;
};

module.exports = productController;
