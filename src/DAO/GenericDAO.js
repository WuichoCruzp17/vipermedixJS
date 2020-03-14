const {sql,connectionString}= require("../database");

const genericDAO ={};

genericDAO.execute = async(query,params)=>{
    var rows = null;
    console.log(query);
    return new Promise((resolve,reject)=>{
    if(params !== null && params !== undefined){
       sql.open(connectionString,(err,conn)=>{
            if(err){
                console.log(err);
                resolve(null);
            }else{
                conn.prepare(query,(e,ps)=>{
                    if(ps.getMeta()){
                        ps.preparedQuery([params],(error,fetched)=>{
                            
                            if(error){
                                console.log(error);
                                resolve(null);
                            }else{
                                resolve(fetched);
                            }
                            ps.free(()=>{
                                //Liberado
                            })
                            
                        });
                    }
                });
            }
       });
    }else{
        console.log(query);
                sql.query(connectionString,query,(err,rows)=>{
            if(err){
                console.log(err);
                resolve(err);
            }else{
                resolve(rows);
            }
        });
    }       

    });


};

genericDAO.executeProcedure =async(sp, params)=>{
/*     console.log("Parametros",params); */
    return new Promise((resolve,reject)=>{
        try{
            sql.open(connectionString,(err,conn)=>{
                console.log("Connexion");
                if(err){
                    console.log("Error 1 --->",err);
                    resolve (null);
                }else{
                    var pm = conn.procedureMgr();
                    console.log("PM-->",pm);
                    try{
                        console.log("CALL-->",sp, params)
                        pm.callproc(sp,params,function(error,result,output){ 
                               console.log(" --- PM CALL ---");
                            if(error){
                                console.log("Errror 2--->",error);
                                console.log(result);    
                                resolve(null);
                            }else{
                                resolve({data:result,output});
                            }
                        });
                    }catch(err){
                        console.log("Error 3-->",err);
                        resolve(null);
                    }
                    
                }
            });

        }catch(err){
            console.log("Error 4--->",err);
        }
        
    }).catch(function(err){
        console.log("Error 5--->",err);
    });
};

module.exports = genericDAO;