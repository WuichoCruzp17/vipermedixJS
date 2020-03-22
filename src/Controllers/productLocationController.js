const productLocation = require('../Models/ProductLocation');
const productLocationController ={};

productLocationController.findByProperty =async(property, value,cols)=>{  
     const productLocations = await productLocation.findByProperty(property,value,cols);
    if(Array.isArray(productLocations)){
        return productLocations;
    }else{
        return null;
    }
};

module.exports = productLocationController;