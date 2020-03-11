const supplier = require('../Models/Supplier');
const {global, login, service,regular_expresion,mesages, form_group,suppliers} = require('../propertis');
const supplierController ={};

supplierController.index = async(req,res)=>{

    res.render('vipermedix/proveedor',{supp:suppliers,global});

};

supplierController.findAll= async (req,res)=>{
    
    if(req !== undefined){
        const cols ={id:supplier.getNameColumn('id'),supplierName:supplier.getNameColumn('supplierName')}
        const data = await findAll(cols);
        res.status(200).json({status:200,data});
    }else{
        const result = await findAll();
        return result;
    }
    
}

async function findAll(cols){
    var result = null;
    if(cols != undefined){
        result = await supplier.findAll(cols);
    }else{
        result = await supplier.findAll();
    }
    
    if(Array.isArray(result)){
        return result;
    }else{
        return [];
    }

}


module.exports = supplierController;