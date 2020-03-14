const supplier = require('../Models/Supplier');
const addreessSATController = require('../Controllers/addreessSATController');
const {global, login, service,regular_expresion,mesages, form_group,suppliers} = require('../propertis');
const supplierController ={};

supplierController.index = async(req,res)=>{
    const addreessSAT = await addreessSATController.findAll();
    res.render('vipermedix/proveedor',{supp:suppliers,global,address:addreessSAT});

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
    
};

supplierController.update = async(req,res)=>{
    const {id, supplierName,rfc,supplierKey,addressSATId,phoneNumber,cellPhoneNumber,emailAddress,logo} = req.body;

    try{
        const rows = await supplier.executeStored('VIPSUPACT',[parseInt(id),supplierName,rfc,supplierKey,addressSATId,phoneNumber,cellPhoneNumber,emailAddress,((logo !=='')? logo:null)]);
        const successful = (data !== null) ? true :false;
        res.status(200).json({status:200,successful, rows});
    }catch(err){
        res.status(200).json({status:500,successful:false, mesage:"Error en  el servidor"})
    }
    
};

supplierController.updateStatus = async (req, res)=>{

    const {id,isActive} = req.body;
    const rows = await supplier.update({
        isActive:{column:supplier.getNameColumn('isActive'), value:isActive}
    },{column:supplier.getNameColumn('id'), value:id});
    const successful = (rows !== null) ? true :false;
        
    res.status(200).json({status:200,successful});

};

supplierController.getSuppliers = async(req,res)=>{
    var data =null;
    var successful
    if(req !== undefined){
        console.log(req.params);
        data = await supplier.executeStored('VIPSUPCON',[req.params.p_tipo,req.params.p_supplier_id,req.params.p_supplierName]);
        successful = (data !==null) ? true:false;
        res.status(200).json({status:200,successful, rows:data});
    }else{
        data = await supplier.executeStored('VIPSUPCON',[req.p_tipo,req.p_supplier_id,req.p_supplierName]);
        return data;
    }

};

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