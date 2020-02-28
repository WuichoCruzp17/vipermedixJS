const helpers = require('../lib/helpers');
let product ={};

product.table = {name:'Product'};

product.columns={

    id:{
        column:'Id',
        primaryKey:true
    },
    alternativeCode:{
        column:'AlternativeCode'
    },
    activeSubstanceId:{
        column:'ActiveSubstanceId'
    },
    description:{
        column:'Description'
    },
    laboratory:{
        column:'Laboratory'
    },
    productSubCategoryId:{
        column:'ProductSubCategoryId'
    },
    standardCost:{
        column:'StandardCost'
    },
    isDiscontinued:{
        column:'IsDiscontinued'
    },
    isRecipe:{
        column:'IsRecipe'
    },
    isActive:{
        column:'IsActive'
    },
    invMin:{
        column:'InvMin'
    },
    invMax:{
        column:'InvMax'
    },
    lastSupplierRefill:{
        column:'LastSupplierRefill'
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

product = helpers.setFunctionsModels(product);

module.exports = product;