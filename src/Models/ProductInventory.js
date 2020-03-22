const helpers = require('../lib/helpers');
let productInventory ={};

productInventory.table ={name:'ProductInventory'};

productInventory.columns ={
    id:{
        column:'Id'
    },
    productId:{
        column:'ProductId'
    },
    pharmacyBranchId:{
        column:'PharmacyBranchId'
    },
    unitsInStock:{
        column:'UnitsInStock'
    }
};

productInventory = helpers.setFunctionsModels(productInventory);

module.exports = productInventory;