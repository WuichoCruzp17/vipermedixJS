document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.ini();
});


const modsJS ={};

const supplierJS={};

supplierJS.validateModel=function(event){
    const result = util.validateForm(event.target.value, suppliers);
    if(result.validate){
        supplierJS.update(result.entity);
    }
};

supplierJS.findById = async function(id){
    const result = await utilXHTTP.get('proveedor/getSuppliers/L1/'+id+'/$');
    if(result.data.successful){
        util.updateFrom(modsJS[suppliers.frm_name], result.data.rows.data[0]);
    }
    console.log(result);
};

supplierJS.findAll = async function(){
    const result = await utilXHTTP.get('proveedor/getSuppliers/L3/0/$');
    if(result.data.successful){
        modsJS.grid._data.gridData =[];
        modsJS.grid._data.gridData =result.data.rows.data;
    }
};

supplierJS.update = async function(model){
    const result = await utilXHTTP.post("proveedor/update",model);
    if(result.successful){
        message.showMessage("Procedimiento exitoso","Se ha actualizado correctament el proveedor","success");
    }
};

modsJS.ini =function(){

    modsJS[suppliers.frm_name] =null;
    const data_frm_supp ={};
    data_frm_supp[suppliers.frm_id] ='';
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
            validateSupplier:supplierJS.validateModel,
            changeSelect:function(event){
                console.log(event);
            }
        }
    });

    modsJS.grid = utilGrid.createGrid({
        script:'#grid-template',
        element:'#demo',
        columns:[
            {name:'Nombre', column:'supplierName'},{name:'Dirección SAT', column:'addressSAT'}, {name:'Contacto', column:'emailAddress'},{name:'', column:''}
        ],
        data:[],
        component:modsJS.getComponent()
    });

    supplierJS.findAll();
};

modsJS.getComponent = function(){
    utilGrid.methods.findById = supplierJS.findById;
        return {
            template:'#grid-template',
              props:    utilGrid.propsDefault,
              data: utilGrid.dataDefault,
              component: utilGrid.component,
              computed: utilGrid.computed,
              filters: utilGrid.filters,
              methods: utilGrid.methods
        }
};

