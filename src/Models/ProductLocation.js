const helpers = require('../lib/helpers');
let productLocation ={};

productLocation.table ={name:'ProductLocation'};

productLocation.columns={
    id:{
        column:'Id',
        primarykey:true
    },
    pharmacyBranchId:{
        column:'PharmacyBranchId'
    },
    location:{
        column:'Location'
    }
};

productLocation = helpers.setFunctionsModels(productLocation);

module.exports = productLocation;