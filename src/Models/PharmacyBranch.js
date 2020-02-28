const helpers = require('../lib/helpers');
let pharmacyBranch={};

pharmacyBranch.table ={name:'PharmacyBranch'};

pharmacyBranch.columns={
    id:{
        column:'Id',
        primarykey:true
    },
    pharmacyMasterId:{
        column:'PharmacyMasterId'
    },
    pharmacyBranchName:{
        column:'PharmacyBranchName'
    },
    uniquePhysicalID:{
        column:'UniquePhysicalID'
    },
    addressId:{
        column:'AddressId'
    },
    responsibleName:{
        column:'ResponsibleName'
    },
    phoneNumber:{
        column:'PhoneNumber'
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
    }
}

pharmacyBranch = helpers.setFunctionsModels(pharmacyBranch);

module.exports = pharmacyBranch;