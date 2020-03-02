const product = require('../Models/Product');
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

module.exports = productController;
