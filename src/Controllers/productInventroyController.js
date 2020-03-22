const productInventory = require('../Models/ProductInventory');
const productInventroyController ={};

//VIPPINVACT

productInventroyController.update = async (model) =>{
    console.log("Model -->",model);
    return await productInventory.executeStored('VIPPINVACT',[model.productInventoryId,model.unitsInStock]);
};

module.exports = productInventroyController;