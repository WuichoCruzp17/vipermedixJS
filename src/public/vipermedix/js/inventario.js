  
document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.ini();
});

var state = {
    disabledDates: {
      to: new Date(), // Disable all dates up to specific date
      from: new Date( (new Date().getFullYear()+10), 1,1), // Disable all dates after specific date
      /* days: [6, 0], // Disable Saturday's and Sunday's
      daysOfMonth: [29, 30, 31], // Disable 29th, 30th and 31st of each month */
      dates: [ // Disable an array of dates
        new Date(new Date().getFullYear(),11,31)
      ],
      ranges: [{ // Disable dates in given ranges (exclusive).
        from: new Date(),
        to: new Date(new Date().getFullYear,11,31)
      }],
      customPredictor: function(date) {
        // disables the date if it is a multiple of 5
        const dTen = new Date( (new Date().getFullYear()+10), 1,1);
        const d = new Date( (new Date().getFullYear()+1),1,1 );
        if(date.getTime() < dTen.getTime() && date.getTime()>d.getTime()){
          return false;
        }
        return true;
      }
    }   
  }
const inventarioJS={};
inventarioJS.lotes=[];

inventarioJS.validarIventario=function(event){
    const result = util.validateForm(event.target.value,inventario);
    if(result.validate){
       if(result.entity.cad_posicion !==""){
        const data = modsJS.grid.gridData;
        data[result.entity.cad_posicion] = result.entity;
        modsJS.grid.gridData  = new Array();
        for(var i=0;i<data.length;i++){
            modsJS.grid.gridData.push(data[i]);
        }
       }else{
        result.entity.cad_posicion =modsJS.grid.gridData.length;
        modsJS.grid.gridData.push(result.entity);
       }
       modsJS[inventario.frm_name][inventario.frm_cantAd] =   modsJS.grid.gridData.length;   
       inventarioJS.limpiarFormularioLotes();
    }
    
};

inventarioJS.selectLote = function(cad_posicion){
    util.updateFrom(modsJS[inventario.frm_CadN],modsJS.grid.gridData[cad_posicion]);
};

inventarioJS.limpiarFormularioLotes = function(){
    document.getElementById(inventario.frm_CadN).reset();
    modsJS[inventario.frm_CadN][inventario.frm_cadp]='';
    modsJS[inventario.frm_CadN][inventario.frm_lote]='';
    modsJS[inventario.frm_CadN][inventario.frm_lote]='';
    modsJS[inventario.frm_CadN][inventario.frm_cant]='';
    modsJS[inventario.frm_CadN][inventario.frm_cantAd]='';
    modsJS[inventario.frm_CadN][inventario.frm_cadl]= new Date();
}

inventarioJS.confirmarRemoveLote = async function(cad_posicion){
    inventarioJS.cad_posicion = cad_posicion;
    try {
        const alert =  await Swal.fire({
             title: inventario.msg_conf_eli_lote,
             text: inventario.msg_txt_eli_lote,
             icon: 'warning',
             showCancelButton: true,
             confirmButtonText: global.key_acep,
             cancelButtonText: global.key_canc
         });
         console.log(alert);
         inventarioJS.prepareToRemove((alert.value && alert.value === true));
     } catch (e) {
         console.log('error:', e);
         return false;
     }
};


inventarioJS.prepareToRemove  = async function(response){
    try{
        if(modsJS.grid.gridData[inventarioJS.cad_posicion].id !== undefined && modsJS.grid.gridData[inventarioJS.cad_posicion].id !== null){
            //elimina directo de la base de datos
        }else{
            //Se elimina solo del cache
            modsJS.grid.gridData.splice(inventarioJS.cad_posicion);
            const data = modsJS.grid.gridData;
            modsJS.grid.gridData = new Array();
            for(var i=0;i<data.length;i++){
                data[i].cad_posicion = i;
                modsJS.grid.gridData.push(data[i]);
            }
            modsJS[inventario.frm_name][inventario.frm_cantAd] =   modsJS.grid.gridData.length;  
        }
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
    
};

inventarioJS.clearFull  = function(){
    document.getElementById(inventario.frm_name).reset();
    document.getElementById(inventario.frm_Nbus).reset();
    modsJS[inventario.frm_name][inventario.frm_cad] = true;
};

inventarioJS.fullValidae = function(){
    modsJS[inventario.frm_butN].disable = true;
    const result = util.validateForm(inventario.frm_name,inventario);
    const resultB = util.validateForm(inventario.frm_Nbus,inventario);
    if(result.validate && resultB.validate){
        if( modsJS.grid.gridData.length>0){
            const data = {model:result.entity,lotes:modsJS.grid.gridData};
            data.model[inventario.frm_sucu] = resultB.entity[inventario.frm_sucu];
            data.model[inventario.frm_prodId] = result.entity[inventario.frm_prodId];
            data.model[inventario.frm_sucu] = resultB.entity[inventario.frm_sucu];
            data.model[inventario.frm_codiB] = resultB.entity[inventario.frm_codiB];
            const obj = modsJS.inventario.options.find(function(x){return  x.value = modsJS.inventario.$data.location});
            data.model.locationString = obj.text;
            data.model[inventario.frm_cad] = modsJS[inventario.frm_name][inventario.frm_cad];
            data.model[inventario.frm_anti] = modsJS[inventario.frm_name][inventario.frm_anti];
            inventarioJS.save(data);

        }else{
            message.showMessage("Sin lotes registrados","Se requiere agregar lotes para completar el proceso","warning");
            modsJS[inventario.frm_butN].disable = false;
        }
    }
};


inventarioJS.save = async function(data){

    const result = await utilXHTTP.post("inventario/saveProductExpiry",data);
    if(result.successful){
        //Limpiar full
        inventarioJS.clearFull();
        modsJS.grid.gridData =new Array();
    }else{
        message.showMessage('Error',result.error,'error');
    }
    modsJS[inventario.frm_butN].disable = false;
};

let modsJS ={};
modsJS[inventario.frm_Nbus] = null;
modsJS[inventario.frm_name] = null;
modsJS[inventario.frm_CadN] = null;
modsJS.ini = function(){

    const data_buscar={};
    data_buscar[inventario.frm_sucu] =0;
    data_buscar[inventario.frm_codiB] ='';
    modsJS[inventario.frm_Nbus] = util.createVueFrom({
        el:"#"+inventario.frm_Nbus,
        model:data_buscar,
        methods:{
            getProduct:this.validete
        }
    });

    modsJS.accountingEvent = function(event){
        this[event.target.name] = accounting.formatMoney(this[event.target.name]);
    }
    const data_inventario ={};
    data_inventario[inventario.frm_prodId]='';
    data_inventario[inventario.frm_prdIn]='';
    data_inventario[inventario.frm_lastPro]='';
    data_inventario[inventario.frm_susA]='';
    data_inventario[inventario.frm_desc]='';
    data_inventario[inventario.frm_preC]='';
    data_inventario[inventario.frm_preP]='';
    data_inventario[inventario.frm_ubi]='0';
    data_inventario[inventario.frm_pro]='0';
    data_inventario[inventario.frm_cad]=true;
    data_inventario[inventario.frm_anti]=false;
    data_inventario[inventario.frm_stckA]='';
    data_inventario[inventario.frm_cantAd]='';
    data_inventario.options =[];
    modsJS[inventario.frm_name] = util.createVueFrom({
        el:"#"+inventario.frm_name,
        model:data_inventario,
        methods:{
            accountingEvent:modsJS.accountingEvent
        }
    });

    const data_add_inventario={};
    data_add_inventario[inventario.frm_cadp]='';
    data_add_inventario[inventario.frm_lote]='';
    data_add_inventario[inventario.frm_cant]='';
    data_add_inventario[inventario.frm_cadl]=null;
    data_add_inventario.lotes =[];
    data_add_inventario['es']=vdp_translation_es.js;
    data_add_inventario.state = state;
    modsJS[inventario.frm_CadN] = util.createVueFrom({
        el:"#"+inventario.frm_CadN,
        model:data_add_inventario,
        methods:{
            validarIventario:inventarioJS.validarIventario,
            soloNumeros:util.soloNumeros,
            limpiar:inventarioJS.limpiarFormularioLotes,     
        },
        components: {
            vuejsDatepicker
        }
    });

    modsJS[inventario.frm_butN] = util.createVueFrom({
        el:'#'+inventario.frm_butN,
        model:{
            disable:false
        },
        methods:{
            fullValidae:inventarioJS.fullValidae
        }
    });

    modsJS.grid = utilGrid.createGrid({
        script:'#grid-template',
        element:'#demo',
        columns:[
            {name:'Numero de Lote', column:'num_lote'},{name:'Cantidad', column:'cant_lote'}, {name:'Caducidada', column:'cad_lote'},{name:'', column:''}
        ],
        data:[],
        component:modsJS.getComponent()
    });
    jQuery("[name='"+inventario.frm_lote+"']").on('keyup',function(){
        util.soloNumeros(this);
    });
    jQuery("[name='"+inventario.frm_cant+"']").on('keyup',function(){
        util.soloNumeros(this);
    });
};

modsJS.getComponent=function(){
    utilGrid.methods.selectLote = inventarioJS.selectLote;
    utilGrid.methods.confirmarRemoveLote = inventarioJS.confirmarRemoveLote;
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

modsJS.validete = function(event){
    const result = util.validateForm(event.target.value, inventario);
    if(result.validate){
        modsJS.getProduct('L2',0,result.entity[inventario.frm_sucu],result.entity[inventario.frm_codiB]);
    }
}
modsJS.getProduct = async function(p_tipo,p_product_id,p_sucu_id,p_barcode){
   const result = await utilXHTTP.post('inventario/getProduct',{p_tipo,p_product_id,p_sucu_id,p_barcode});
   if(result.successful){
    modsJS[inventario.frm_name].options = new Array();
    modsJS[inventario.frm_name].options = util.createOptions('id','location', result.productsLocations);
      util.updateFrom(modsJS[inventario.frm_name],result.products.data[0]);
   }else{
       console.log(result);
   }
};
