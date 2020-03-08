const indexController ={};

indexController.index = async (req, res)=>{
    res.render('vipermedix/index');
};

module.exports = indexController;