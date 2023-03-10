const { Router } = require('express');
const { check } = require('express-validator');
const { postFactura, getFacturas, getFacturaPorID } = require('../controllers/factura');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarStock } = require('../middlewares/validar-stock');

const router = Router();

router.get('/mostrar', getFacturas);

 router.get('/:id', [
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    validarCampos
], getFacturaPorID);
    
router.post('/facturar', [
    validarJWT,
    validarStock,
    validarCampos
], postFactura);

module.exports = router;