const express = require('express')
const app = express()

// importar conexion mongoDB
const archivoDB = require('./conexion')

//Importacion del archivo de modelo y rutas de usuario
const rutaUsuario = require('./rutas/usuario')

//importar body parser
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:'true'}))

app.use('/api/usuario', rutaUsuario)

app.get('/', (req, res)=>{
    res.end('Bienvenidos al servidor backend node.Corriendo....')
})

//Configurar server basico
app.listen(5000, function(){
    console.log('El servidor NODE esta corriendo correctamente en el puerto 5000')
})