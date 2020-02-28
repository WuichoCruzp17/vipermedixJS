  
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
    console.log(util.validateForm(event.target.value, inventario));
}
modsJS.getProduct = async function(){
    
}