const { request, responce } = require('express');


const esAdminRole = (req = require, res = responce, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });

    }
    const { rol, nombre } = req.usuario
    if (rol !== 'ADMIN') {
        return res.status(401).json({
            msg: `${nombre}, no es admin - No puede hacer esto`
        });
    }

    next();

}

module.exports = {
    esAdminRole
}