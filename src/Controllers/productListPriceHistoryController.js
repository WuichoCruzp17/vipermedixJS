const productListPriceHistory = require('../Models/ProductListPriceHistory');
const {inventario} = require('../propertis');
const productListPriceHistoryController ={};

productListPriceHistoryController.update = async(model)=>{
    
    return await productListPriceHistory.executeStored('VIPPLHISACT',[
                   model[inventario.frm_prodId], 
                   model[inventario.frm_sucu],
                   model[inventario.frm_preP]
    ]
                   );

};

module.exports = productListPriceHistoryController;