const {sql,connectionString}= require("../database");

const genericDAO ={};

genericDAO.execute = async(query,params)=>{
    var rows = null;

    return new Promise((resolve,reject)=>{
    if(params !== null && params !== undefined){
       sql.open(connectionString,(err,conn)=>{
            if(err){
                resolve(err);
            }else{
                conn.prepare(query,(e,ps)=>{
                    if(ps.getMeta()){
                        ps.preparedQuery([params],(error,fetched)=>{
                            
                            if(error){
                                resolve(error);
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
    console.log("Parametros",params);
    return new Promise((resolve,reject)=>{
        sql.open(connectionString,(err,conn)=>{
            if(err){
                console.log(err);
                resolve ('No hay conexión con la base de datos');
            }else{
                var pm = conn.procedureMgr();
                pm.callproc(sp,params,(error,result,output)=>{    
                    if(error){
                        console.log(error);
                        console.log(result);    
                        resolve('Error al ejecutar el proceso');
                    }else{
                        resolve({data:result,output});
                    }
                })
            }
        })  
    });
};
module.exports = genericDAO;