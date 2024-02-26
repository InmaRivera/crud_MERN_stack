const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const eschema = mongoose.Schema

const eschemaUsuario = new eschema({
    nombre: String,
    email: String,
    telefono: String,
    idUsuario: String
})

const ModeloUsuario = mongoose.model('usuarios', eschemaUsuario)
module.exports = router

//ruta de prueba
// router.get('/ejemplo', (req,res) => {
//     res.end('Saludo desde ruta')
// })

//agregar usuarios
router.post('/agregarusuario', (req, res) => {
    const nuevoUsuario = new ModeloUsuario({
        //acceder al nombre del input
        nombre: req.body.nombre,
        email: req.body.email,
        telefono: req.body.telefono,
        idUsuario: req.body.idUsuario
    })
    nuevoUsuario.save()
        .then(() => {
            res.send('Usuario agregado correctamente');
        })
        .catch((err) => {
            res.status(500).send(err);
        });
})
//obtener todos los usuarios
router.get('/obtenerusuarios', (req, res) => {

    ModeloUsuario.find()
        .then(usuarios => {
            res.json(usuarios);
        })
        .catch(error => {
            res.status(500).send('Error al obtener usuarios: ' + error);
        });
})
//obtener data usuario
router.post('/obtenerdatausuario', async (req, res) => {
    try {
        const docs = await ModeloUsuario.find({ idusuario: req.body.idUsuario }).exec();
        res.send(docs);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error interno del servidor: " + err);
    }
});


//actualizar usuario
router.post('/actualizausuario', (req, res) => {
    ModeloUsuario.findOneAndUpdate({ idUsuario: req.body.idUsuario }, {
        nombre: req.body.nombre,
        email: req.body.email,
        telefono: req.body.telefono
    })
    .then(doc => {
        if (doc) {
            res.send('Usuario actualizado correctamente');
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    })
    .catch(err => {
        res.status(500).send('Error al actualizar usuario: ' + err);
    });
});

//Eliminar usuario usando promises en lugar de callback
// Eliminar usuario
router.post('/borrarUsuario', (req, res) => {
    ModeloUsuario.findOneAndDelete({ idUsuario: req.body.idUsuario })
    .then(doc => {
        if (doc) {
            res.send('Usuario eliminado correctamente');
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    })
    .catch(err => {
        res.status(500).send('Error al eliminar usuario: ' + err);
    });
});



