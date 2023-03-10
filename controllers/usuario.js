const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const getUsuarios = async (req = request, res = response) => {

    const query = { estado: true };

    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ]);

    res.json({
        msg: 'GET API de usuarios',
        listaUsuarios
    });

}

const postUsuario = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuarioDB = new Usuario({ nombre, correo, password, rol });

    const salt = bcryptjs.genSaltSync();
    usuarioDB.password = bcryptjs.hashSync(password, salt);

    await usuarioDB.save();

    res.status(201).json({
        msg: 'POST API de usuario',
        usuarioDB
    });

}

const registroUsuario = async (req = request, res = response) => {

    const { nombre, correo, password } = req.body;
    const registerUser = new Usuario({ nombre, correo, password });

    const salt = bcryptjs.genSaltSync();
    registerUser.password = bcryptjs.hashSync(password, salt);

    await registerUser.save();

    res.status(201).json({
        msg: 'Registro de usuario',
        registerUser
    });

}

const putUsuario = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, rol, estado, google, ...resto } = req.body;
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(resto.password, salt);
    const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT API de usuario',
        usuarioEditado
    });

}

const deleteUsuario = async (req = request, res = response) => {

    const { id } = req.params;

    const usuarioEliminado = await Usuario.findByIdAndDelete(id);
    res.json({
        msg: 'DELETE API de usuario',
        usuarioEliminado
    });

}


module.exports = {
    getUsuarios,
    postUsuario,
    registroUsuario,
    putUsuario,
    deleteUsuario
}