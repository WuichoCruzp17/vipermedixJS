var session = require('express-session');
var MSSQLStore = require('connect-mssql')(session);
const configuration = require( "./config" );
var config = {
    user:configuration.sql.user,
    password:configuration.sql.password,
    server: configuration.sql.server, // You can use 'localhost\\instance' to connect to named instance
    database: configuration.sql.database,
    
    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
};

const coonexionMSSQLStore = new MSSQLStore(config);
console.log("MSSQLSTORE--->",coonexionMSSQLStore);
module.exports = coonexionMSSQLStore;