const productExpiryController ={};
const productExpiry = require('../Models/ProductExpiry');

productExpiryController.save = async(model)=>{
    return await productExpiry.executeStored('VIPPEXPALT',[model.discontinuedDate,model.productId,model.pharmacyBranchId]);
};

module.exports =productExpiryController;