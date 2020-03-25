const productListPriceHistory = require('../Models/ProductListPriceHistory');
const {inventario} = require('../propertis');
const productListPriceHistoryController ={};

productListPriceHistoryController.update = async(model)=>{

    return await productListPriceHistory.executeStored(
                   model[inventario.frm_prodId], 
                   model[inventario.frm_sucu],
                   model[inventario.frm_preP]
                   );

};