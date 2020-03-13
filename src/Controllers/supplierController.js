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

    //const data = await supplier.executeQuery("SELECT * FROM Product WHERE Id = ?",1);
    //console.log(data);
    const {id, supplierName,rfc,supplierKey,addressSATId,phoneNumber,cellPhoneNumber,emailAddress,logo} = req.body;
   /*  const row = await supplier.update({
        id:{column:supplier.getNameColumn(suppliers.frm_id), value: id},
        supplierName:{column:supplier.getNameColumn(suppliers.frm_nameS), value:supplierName},
        rf:{column:supplier.getNameColumn(suppliers.frm_rfc), value:rfc},
        supplierKey:{column:supplier.getNameColumn(suppliers.frm_ksp), value:supplierKey},

    }) */
    try{
        const rows = await supplier.executeStored('VIPSUPACT',[parseInt(id),supplierName,rfc,supplierKey,addressSATId,phoneNumber,cellPhoneNumber,emailAddress,((logo !=='')? logo:null)]);
       /*  var p_supplier_id  = id;
        var p_supplierName  = supplierName;
        var p_rfc  = rfc;
        var p_supplierKey  = supplierKey;
        var p_addressSATId  = addressSATId;
        var p_phoneNumber  = phoneNumber;
        var p_cellPhoneNumber  = cellPhoneNumber;
        var p_logo  = lolo; */
       // const rows = await supplier.executeStored('VIPSUPACT',[p_supplier_id,p_supplierName,rfc,p_supplierKey,p_addressSATId,p_phoneNumber,p_cellPhoneNumber,emailAddress,((logo !=='')? logo:null)]);
        const successful = (data !== null) ? true :false;
        res.status(200).json({status:200,successful, rows});
    }catch(err){
        res.status(200).json({status:500,successful:false, mesage:"Error en  el servidor"})
    }
    
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