
const utilModel = require('../UtilModels/modelUtil');
const helpers ={};


helpers.setFunctionsModels = (e) =>{
    for(var key in utilModel){
      e[key] = utilModel[key];
    }
    return e;
  };

helpers.randomNumbe = ()=>{
    const possible ='abcdefghijklmnoqrstuvwxyz0123456789';
    var randomNumbe ="";
    for(let i=0; i<6;i++){
        randomNumbe += possible.charAt(Math.floor(Math.random()*possible.length));

    }
    return randomNumbe;
};
  module.exports= helpers;