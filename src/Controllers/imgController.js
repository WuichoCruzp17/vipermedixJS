const path = require('path');
const {randomNumbe} = require('../lib/helpers');
const fs =require('fs-extra');
const imgController = {};

imgController.save = async (req,res)=>{
    const nombreRandom = randomNumbe();
    const imageTempPath = req.file.path;
    const ext =path.extname(req.file.originalname).toLowerCase();
    const targetPaht = path.resolve(`src/public/upload/${nombreRandom}${ext}`);
    if(ext==='.png' || ext ==='.jpg' || ext ==='.jpeg'){
        await fs.rename(imageTempPath, targetPaht);
        res.status(200).json({status:200,successful:true,nombreRandom});
    }else{
        res.status(200).json({status:505,successful:false,error:'El formato del archivo no es valido'});
    }
};

module.exports = imgController;