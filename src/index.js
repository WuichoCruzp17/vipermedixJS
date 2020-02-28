const express =    require('express');
const morgan =    require('morgan');
const expresshbs =  require('express-handlebars');
const path =    require('path');
const session =    require('express-session');
const sql = require('mssql/msnodesqlv8')
const genericDAO = require("./DAO/GenericDAO");
//Initizations
const app =    express();

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs',expresshbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), '/layouts'),
    partialsDir:path.join(app.get('views'), '/partials'),
    extname:'.hbs',
    helpers:require('./lib/handlebars')
}));

app.set('view engine','.hbs');
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//app.use(passport.initialize());

//Global Variables
app.use((req, res, next)=>{
    app.locals.user    =req.user;
    next();
});
app.use('/vipermedix/inventario', require('./routes/inventario'));

//Public
app.use(express.static(path.join(__dirname, 'public')));
//Startin server
app.listen(app.get('port'),()=>{
    console.log('Server on por', app.get('port'));
});


function conexion(){
    const pool = new sql.ConnectionPool({
        user: 'LUIS\\Wicho Segura',
        password: '',
        server: 'Luis\\SQLEXPRESS',
        database: 'ViperMedixDevDb'
    });
    console.log(pool);
    pool.connect(err => {
        console.log(err);
    })
}

function call(){
conexion();
}

//call();