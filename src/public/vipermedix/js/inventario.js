  
document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.ini();
});

const iventarioJS={};
iventarioJS.lotes=[];
iventarioJS.validarIventario=function(event){
    const result = util.validateForm(event.target.value,inventario);
    if(result.validate){
       jQuery("#table-lotes").html("");
       iventarioJS.lotes.push(result.entity);
       for(var i=0;i<iventarioJS.lotes.length;i++){
           jQuery("#table-lotes").append(
               "<tr>"+
                    "<td style='display:none;'>"+iventarioJS.lotes[i][inventario.frm_cadp]+"</td>"+
                    "<td>"+iventarioJS.lotes[i][inventario.frm_lote]+"</td>"+
                    "<td>"+iventarioJS.lotes[i][inventario.frm_cant]+"</td>"+
                    "<td>"+iventarioJS.lotes[i][inventario.frm_cadl]+"</td>"+
                "<tr>"

           );
       }
       document.getElementById(inventario.frm_CadN).reset()
    }
    
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
    const data_inventario ={};
    data_inventario[inventario.frm_susA]='';
    data_inventario[inventario.frm_desc]='';
    data_inventario[inventario.frm_preC]='';
    data_inventario[inventario.frm_preP]='';
    data_inventario[inventario.frm_ubi]='0';
    data_inventario[inventario.frm_pro]='0';
    data_inventario[inventario.frm_cad]=false;
    data_inventario[inventario.frm_anti]=false;
    data_inventario[inventario.frm_stckA]='';
    data_inventario[inventario.frm_cantAd]='';

    modsJS[inventario.frm_name] = util.createVueFrom({
        el:"#"+inventario.frm_name,
        model:data_inventario
    });

    const data_add_inventario={};
    data_add_inventario[inventario.frm_cadp]='';
    data_add_inventario[inventario.frm_lote]='';
    data_add_inventario[inventario.frm_cant]='';
    data_add_inventario[inventario.frm_cadl]= new Date();
    data_add_inventario.lotes =[];
  /*   const data = function(){
        return {es:vdp_translation_es}
    } */
    data_add_inventario['es']=vdp_translation_es.js;

    modsJS[inventario.frm_CadN] = util.createVueFrom({
        el:"#"+inventario.frm_CadN,
        model:data_add_inventario,
        methods:{
            validarIventario:iventarioJS.validarIventario,
            soloNumeros:util.soloNumeros
        },
        components: {
            vuejsDatepicker
        }
    });
    modsJS.grid = utilGrid.createGrid({
        script:'#grid-template',
        element:'#demo',
        data:[],
        component:modsJS.getComponent
    });
    jQuery("[name='"+inventario.frm_lote+"']").on('keyup',function(){
        util.soloNumeros(this);
    });
    jQuery("[name='"+inventario.frm_cant+"']").on('keyup',function(){
        util.soloNumeros(this);
    });
};

modsJS.getComponent=function(){

    return {
        template:'#grid-template',
        component: utilGrid.component
    }

};

modsJS.validete = function(event){
    const result = util.validateForm(event.target.value, inventario);
    if(result.validate){
        modsJS.getProduct('L2',0,result.entity[inventario.frm_sucu],result.entity[inventario.frm_codiB]);
    }
}
modsJS.getProduct = async function(p_tipo,p_product_id,p_sucu_id,p_barcode){
   const result = await utilXHTTP.post('/getProduct',{p_tipo,p_product_id,p_sucu_id,p_barcode});
   if(result.successful){
      util.updateFrom(modsJS[inventario.frm_name],result.products.data[0]);
   }else{
       console.log(result);
   }
};
