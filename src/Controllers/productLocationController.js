const productLocation = require('../Models/ProductLocation');
const productLocationController ={};

productLocationController.findAll =async()=>{
    const cols ={id:productLocation.getNameColumn('id'),location:productLocation.getNameColumn('location')}
    const productLocations = await productLocation.findAll(cols);
    if(Array.isArray(productLocations)){
        return productLocations;
    }else{
        return [];
    }
};

module.exports = productLocationController;