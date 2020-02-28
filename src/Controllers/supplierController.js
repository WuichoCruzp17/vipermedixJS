const supplier = require('../Models/Supplier');

const supplierController ={};

supplierController.findAll= async ()=>{

    const cols ={id:supplier.getNameColumn('id'),supplierName:supplier.getNameColumn('supplierName')}
    const suppliers = await supplier.findAll(cols);
    if(Array.isArray(suppliers)){
        return suppliers;
    }else{
        return [];
    }
}


module.exports = supplierController;