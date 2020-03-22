const express =    require('express');
const morgan =    require('morgan');
const expresshbs =  require('express-handlebars');
const path =    require('path');
const session =    require('express-session');
const multer = require('multer');
const sql = require('mssql/msnodesqlv8');
const passport =    require('passport');
var bodyParser = require('body-parser');
const coonexionMSSQLStore = require('./mssqlstore');
//Initizations
const app =    express();
require('./lib/passport');
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
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(multer({dest:path.join(__dirname,'/public/upload/temp')}).single('image'));
//Passport

app.set('trust proxy', 1) ;
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store:coonexionMSSQLStore
  }));
//app.use(passport.initialize());
//app.use(passport.session());
app.use(express.json());

//Global Variables
app.use((req, res, next)=>{
    app.locals.user    =req.user;
    next();
});
app.use('/', require('./routes/login'));
app.use('/vipermedix/', require('./routes/index'));
app.use('/vipermedix/inventario', require('./routes/inventario'));
app.use('/vipermedix/proveedor', require('./routes/supplier'));

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