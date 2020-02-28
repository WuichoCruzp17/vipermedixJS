
const utilModel = require('../UtilModels/modelUtil');
const helpers ={};


helpers.setFunctionsModels = (e) =>{
    for(var key in utilModel){
      e[key] = utilModel[key];
    }
    return e;
  };
  
  module.exports= helpers;