const helpers = require('../lib/helpers');
let addreessSAT ={};

addreessSAT.table ={name:'AddressSAT'};

addreessSAT.columns ={

    id:{
        column:'Id',
        primarykey:true
    },

    objectKey:{
        column:'objectKey'
    },

    roadTypeId:{
        column:'RoadTypeId'
    },

    addressTypeId:{
        column:'AddressTypeId'
    },

    street:{
        column:'Street'
    },

    noInt:{
        column:'No_Int'
    },

    noExt:{
        column:'No_Ext'
    },

    colony:{
        column:'Colony'
    },

    stateProvinceId:{
        column:'StateProvinceId'
    },

    cityId:{
        column:'CityId'
    },

    postalCode:{
        column:'PostalCode'
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

};

addreessSAT = helpers.setFunctionsModels(addreessSAT);

module.exports = addreessSAT;