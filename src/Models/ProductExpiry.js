const helpers = require('../lib/helpers');
let productExpiry ={};

productExpiry.table ={name:'ProductExpiry'};

productExpiry.columns = {
    id:{
        column:'Id'
    },
    discontinuedDate:{
        column:'DiscontinuedDate'
    },
    productId:{
        column:'ProductId'
    },
    pharmacyBranchId:{
        column:'PharmacyBranchId'
    }
};

productExpiry = helpers.setFunctionsModels(productExpiry);

module.exports = productExpiry;