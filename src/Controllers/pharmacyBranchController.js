const pharmacyBranch = require('../Models/PharmacyBranch');
const pharmacyBranchController ={};

pharmacyBranchController.findAll = async()=>{
    const cols ={id:pharmacyBranch.getNameColumn('id'),pharmacyBranchName:pharmacyBranch.getNameColumn('pharmacyBranchName')}
    const pharmacyBranchs = await pharmacyBranch.findAll(cols);
    if(Array.isArray(pharmacyBranchs)){
        return pharmacyBranchs;
    }else{
        return [];
    }
};

module.exports = pharmacyBranchController;