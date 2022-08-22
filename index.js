import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';


const app = express();

// Conectar la base de datos
db.authenticate()
    .then( () => console.log('Base de datos conectada'))
    .catch( error => console.log(error) );

// Definir puerto
const port = process.env.PORT || 4000;

// Habilitar PUG
app.set('view engine', 'pug');

// Obtener el año actual
// request peticion 
// response respuesta
// next "return" permite cambiar al siguiente elemento o funcion
app.use((request,response, next)=>{
    const year = new Date();

    response.locals.actualYear = year.getFullYear();
    response.locals.nombreSitio = "Agencia de Viajes"
    next();
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir carpeta publica
// Esto para recursos (img y estilos)
app.use(express.static('public')); // Para leer los datos del formulario

// Agregar router
app.use('/', router);


// request => peticion o lo que enviamos
// response => lo que express responde

app.listen( port, () =>{
    console.log(`El servidor inicio en el puerto ${port} `);
});