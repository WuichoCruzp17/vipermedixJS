
document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.ini();
});


const modsJS={};

modsJS[login.frm_name]=null;
modsJS.ini = function(){
    const model_login={};
    model_login[login.frm_emp]='';
    model_login[login.frm_usr]='';
    model_login[login.frm_pas]='';
    modsJS[login.frm_name] = util.createVueFrom({
        el:"#"+login.frm_name,
        model:model_login
    });
};