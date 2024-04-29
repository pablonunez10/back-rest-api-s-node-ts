import Router from 'express'
import {body, param} from 'express-validator'
import { createProduct, getProducts, updateProduct, updateAvailability, deleteProduct } from './handlers/product'
import { handleInputErrors } from './middleware'
import { getProductsById } from './handlers/product'
const router = Router()

//Routing 
router.get('/', getProducts)
router.get('/:id', 
    param('id').isInt().withMessage('ID NO VALIDO'),
    handleInputErrors,
    getProductsById
)

router.post('/',
    body('name')
        .notEmpty().withMessage('EL nombre del Producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('EL precio del Producto no puede ir vacio')
        .custom(value => value > 0).withMessage('EL precio no valido'),
    handleInputErrors,
    createProduct
)

router.put('/:id', 
    body('name')
        .notEmpty().withMessage('EL nombre del Producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('EL precio del Producto no puede ir vacio')
        .custom(value => value > 0).withMessage('EL precio no valido'),
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no valido'),
    handleInputErrors,
    updateProduct 
)

router.patch('/:id', 
    param('id').isInt().withMessage('ID NO VALIDO'),
    handleInputErrors,
    updateAvailability
)

router.delete('/:id', 
    param('id').isInt().withMessage('ID NO VALIDO'),
    handleInputErrors,
    deleteProduct 
)

export {router}