const helpers = require('../lib/helpers');
let supplier ={};
supplier.table ={name:'Supplier'};
supplier.columns ={
    id:{
       column:'Id',
       primarykey:true
    },
    supplierName:{
        column:'SupplierName'
    },
    rfc:{
        column:'RFC'
    },
    supplierKey:{
        column:'SupplierKey'
    },
    addressSATId:{
        column:'AddressSATId'
    },
    phoneNumber:{
        column:'PhoneNumber'
    },
    cellphoneNumber:{
        column:'CellphoneNumber'
    },
    emailAddress:{
        column:'EmailAddress'
    },
    isActive:{
        column:'IsActive'
    },
    logo:{
        column:'Logo'
    },
    createdAt:{
        column:'CreatedAt'
    },
    createdBy:{
        column:'CreatedBy'
    },
    lastModifiedAt:{
        column:'LastModifiedAt'
    },
    lastModifiedBy:{
        column:'LastModifiedBy'
    },
    addressSAT:{
        column:'AddressSAT'
    }
}

supplier = helpers.setFunctionsModels(supplier);

module.exports = supplier;