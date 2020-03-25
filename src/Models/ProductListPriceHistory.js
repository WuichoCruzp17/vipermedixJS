const helpers = require('../lib/helpers');
let productListPriceHistory ={};

productListPriceHistory.table = {name:'ProductListPriceHistory'};

productListPriceHistory.columns={
    id:{
        column:'Id'
    },
    productId:{
        column:'ProductId'
    },
    pharmacyBranchId:{
        column:'PharmacyBranchId'
    },
    listPrice:{
        column:'ListPrice'
    }
};

productListPriceHistory = helpers.setFunctionsModels(productListPriceHistory);

module.exports = productListPriceHistory;