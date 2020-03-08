document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.ini();
});


const modsJS ={};

const supplierJS={};

supplierJS.validateModel=function(event){
    const result = util.validateForm(event.target_value, suppliers);
    if(result.validate){
        
    }
};

modsJS.ini =function(){

    modsJS[suppliers.frm_name] =null;
    const data_frm_supp ={};
    data_frm_supp[suppliers.frm_nameS] ='';
    data_frm_supp[suppliers.frm_rfc] ='';
    data_frm_supp[suppliers.frm_ksp] ='';
    data_frm_supp[suppliers.frm_ASAT] ='0';
    data_frm_supp[suppliers.frm_tele] ='';
    data_frm_supp[suppliers.frm_cel] ='';
    data_frm_supp[suppliers.frm_email] ='';
    data_frm_supp[suppliers.frm_logo] ='';

    modsJS[suppliers.frm_name] =util.createVueFrom({
        el:'#'+suppliers.frm_name,
        model:data_frm_supp,
        methods:{
            validateSupplier:supplierJS.validateModel
        }
    });
};

