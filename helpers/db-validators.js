const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');
const Role = require('../models/role');

const emailExiste = async (correo = '') => {

    const existeEmailDeUsuario = await Usuario.findOne({ correo })
    if (existeEmailDeUsuario) {
        throw new Error(`El correo ${correo}, ya esta registrado en la DB`);
    }
}

const esRoleValido = async (rol = '') => {

    const existeRoleDB = await Role.findOne({ rol })
    if (!existeRoleDB) {
        throw new Error(`El rol ${rol}, no existe en la DB`)
    }
}

const existeUsuarioPorId = async (id) => {

    const existIdOfUser = await Usuario.findById(id);
    if (!existIdOfUser) {
        throw new Error(`El id: ${id} no existe en la DB`)
    }

}

const existeCategoriaPorId = async (id) => {

    const existIdOfCategory = await Categoria.findById(id);
    if (!existIdOfCategory) {
        throw new Error(`El id: ${id} no existe en la DB`)
    }

}

const existeProductoPorId = async (id) => {

    const existIdOfProduct = await Producto.findById(id);
    if (!existIdOfProduct) {
        throw new Error(`El id: ${id} no existe en la DB`);
    }

}

module.exports = {
    emailExiste,
    esRoleValido,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}