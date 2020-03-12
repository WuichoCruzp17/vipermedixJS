const addreessSAT = require('../Models/AddressSAT');
const addreessSATController ={};

addreessSATController.findAll = async (req,res)=>{

    if(req !== undefined){
        const data = await findAll(cols);
        res.status(200).json({status:200,data});
    }else{
        const result = await findAll();
        return result;
    }

};

async function findAll(cols){
    var result = null;
    if(cols != undefined){
        result = await addreessSAT.findAll(cols);
    }else{
        result = await addreessSAT.findAll();
    }
    
    if(Array.isArray(result)){
        return result;
    }else{
        return [];
    }
}

module.exports  = addreessSATController;