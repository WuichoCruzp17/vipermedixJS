  
document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.ini();
});

let modsJS ={};
modsJS[inventario.frm_Nbus] = null;
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
};

modsJS.validete = function(event){
    const result = util.validateForm(event.target.value, inventario);
    if(result.validate){
        this.getProduct('L2',0,result.entity[inventario.frm_sucu],result[frm_codiB]);
    }
}
modsJS.getProduct = async function(p_tipo,p_product_id,p_sucu_id,p_barcode){
    
}