  const configuration = require( "./config" );
const sql = require("msnodesqlv8");
const connectionString = "server=LUIS\\MSSQLSERVER14;Database=ViperMedixDb;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0};";
const query = "SELECT GETDATE();";

sql.query(connectionString, query, (err, rows) => {
    if(err){
        console.log(err);
    }else{console.log(rows);}
});


module.exports =  {sql,connectionString};