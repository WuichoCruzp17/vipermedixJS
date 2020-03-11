const session ={};

session.isLoggedIn = (req,res,next)=>{
    console.log(req);
    console.log("Entro -------->");
    if(req.session){
        console.log("Seccion: ",req.session);
        return next();
    }else{
        console.log("Sin inicciar sección");
        return res.redirect('/login');
    }
};

module.exports = session;