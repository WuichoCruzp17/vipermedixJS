const inventario ={
    gbx_busq:'Busqueda por:',
    gbx_dap:'Datos del producto:',
    gbx_cad:'Control de caducidades:',
    key_tit:'Almacen',
    key_sucu:'Sucursal',
    key_codiB:'Codigo de Barras',
    key_susA:'Sustancia Activa',
    key_desc:'Descripción',
    key_preC:'Precio de Costo',
    key_preP:'Precio Publico',
    key_ubi:'Ubicación',
    key_pro:'Proveedor',
    key_stckA:'Stock Actual',
    key_cantAd:'Cantidad Adquirida',
    key_cad:'Caducidad',
    key_anti:'Antibiotico',
    key_agIn:'Agregar Inventario',
    key_titM:'Control de Caducidades',
    key_subtM:'Favor de Ingresar el #Lote, Stock y la Caducidad \n Correspondientes',
    key_numLoM:'Numero de Lote',
    key_cantM:'Cantidad',
    key_cadM:'Caducidad',
    frm_Nbus:"frm_buscar",
    frm_name:'inventario',
    frm_prodId:'productId',
    frm_sucu:'pharmacyBranchId',
    frm_prdIn:'productInventoryId',
    frm_codiB:'barCode',
    frm_susA:'substance',
    frm_desc:'description',
    frm_preC:'standardCost',
    frm_preP:'listPrice',
    frm_ubi:'location',
    frm_stckA:'unitsInStock',
    frm_cantAd:'cantidad_adquirida',
    frm_pro:'proveedor',
    frm_lastPro:'lastSupplierRefill',
    frm_cadM:'caducidad',
    frm_anti:'isRecipe',
    frm_cad:'caducidad',
    frm_lote:'num_lote',
    frm_cant:'cant_lote',
    frm_cadl:'cad_lote',
    frm_cadp:'cad_posicion',
    frm_CadN:'frm_caducidad',
    frm_butN:'frm_buttons',
    mxl_lote:21,
    mnl_lote:10,
    mg_preC:'El Precio Costo es requerido',
    mg_preP:'El Precio Público es requerido',
    msg_ubi:'La ubicación es requerido',
    msg_prov:'El Proveedor es requerido',
    tbl_numl:'Numero de Lote',
    tbl_cant:'Cantidad',
    tbl_cad:'Caducidad',
    tbl_btmod:'Seleccionar',
    msg_cantl:'El campo de cantidad no puede ir vacio',
    msg_cadl:'Debe de seleccionar una fecha de caducidad',
    dtp_plac:'Seleccione una fecha',
    msg_lote:'El número de lote es requerido',
    msg_canl:'Cantidad de lote es requerido',
    msg_conf_eli_lote:'¿Estas seguro de eliminiar este lote?',
    msg_txt_eli_lote:'Una vez realizada la acción ya no se podra recuperar la información'

};

const suppliers ={
    key_addP:'Información de  Proveedor',
    key_name:'Nombre',
    key_rfc:'RFC',
    key_ksp:'Clave del proveeor',
    key_ASAT:'Dirección  SAT',
    key_tele:'Telefono',
    key_cel:'Celular',
    key_email:'Correo',
    key_log:'Logo',
    frm_name:'frm_supplier',
    frm_id:'id',
    frm_nameS:'supplierName',
    frm_rfc:'rfc',
    frm_ksp:'supplierKey',
    frm_ASAT:'addressSATId',
    frm_tele:'phoneNumber',
    frm_cel:'cellPhoneNumber',
    frm_email:'emailAddress',
    frm_logo:'logo',
    frm_acti:'isActive',
    msg_name:'Nombre es requerido',
    msg_rfc:'El RFC es requerido',
    msg_ksp:'Clave del proveeor es requerido',
    msg_ASAT:'La dirección es requerido',
    msg_email:'El correo es requerido'

};

const global ={
    key_bus:'Buscar',
    key_limp:'Limpiar',
    key_acep:'Aceptar',
    key_canc:'Cancelar',
    key_guad:'Guardar'
};

const login ={
    key_emp:'Empresa',
    key_user:'Usuario',
    key_pass:'Contraseña',
    key_iniS:'Iniciar   Sesion',
    frm_name:'frm_login',
    frm_emp:'empresa',
    frm_usr:'usuario',
    frm_pas:'password'
};

const service={
    path:"https://localhost:5001"
};

const regular_expresion={
    nmbers:/^([0-9])*$/
};

const mesages={
    msg_lon_M:'El ${text} no debe de superar ${number} caracteres',
    msg_lon_m:'El ${text} debe de cumplir por lo menos ${number} caracteres'
};

const form_group={
    txt:'text',
    slc:'select',
    txa:'textarea',
    btn:'button'
};

module.exports = {inventario,global, login, service,regular_expresion,mesages, form_group,suppliers}