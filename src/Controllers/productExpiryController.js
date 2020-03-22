const productExpiryController ={};
const dateFormat = require('dateformat');
const productExpiry = require('../Models/ProductExpiry');

productExpiryController.save = async(model)=>{
    console.log("Model--->", model);
    return await productExpiry.executeStored('VIPPEXPALT',[dateFormat(model.discontinuedDate,"yyyy-mm-dd"),model.productId,model.pharmacyBranchId,model.lotNumber]);
};

module.exports =productExpiryController;