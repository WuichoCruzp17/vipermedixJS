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
        jQuery("#"+suppliers.frm_ASAT).val(result.data.rows.data[0].addressSATId);
    }
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
        supplierJS.findAll();
    }
};

supplierJS.changeStatus = async function(suppId){
    console.log(suppId);
    var supplier =null;
    for(var i =0;i<modsJS.grid.gridData.length;i++){
        if(modsJS.grid.gridData[i].id == suppId){
            supplier = modsJS.grid.gridData[i];
        }
    }
    supplier.isActive = (supplier.isActive) ? false:true;
    supplierJS.updateStatus(supplier);
}

supplierJS.updateStatus = async function(model){
    const result =  utilXHTTP.post('proveedor/updateStatus', model);
    if(result.successful){
        supplierJS.findAll();
    }else{
        message.showMessage('Error en el servior','Ups, hubo un problema en el servidor, vuelva a intentarlo o vuelva mas tarde','error')
    }
}

supplierJS.limpiar = function(){
    const form = document.getElementById(suppliers.frm_name);
    form.reset();
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
    const watch={};
    watch[suppliers.frm_ASAT]= function(val){
        console.log(val);
        this[suppliers.frm_ASAT] = val;
    }
    modsJS[suppliers.frm_name] =util.createVueFrom({
        el:'#'+suppliers.frm_name,
        model:data_frm_supp,
        methods:{
            validateSupplier:supplierJS.validateModel,
            changeSelect:function(event){
                console.log(event);
            },
            limpiar:supplierJS.limpiar,
            changeStatus:supplierJS.changeStatus
        },
        watch:null
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

