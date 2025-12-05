import {Router} from 'express';
import { 
    getProductsCtrl,
    getProductByIdCtrl,
    createProductCtrl,
    deleteProductCtrl, 
    updateProductCtrl
} from '../controllers/product.controller.js';

import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router ();

//Ruta publica
router.get('/', getProductsCtrl);// devuelve todos los prod
router.get('/:id', getProductByIdCtrl);//devuelve prod por id

//Ruta privada (con Token)
router.post('/create', authMiddleware, createProductCtrl);//crea prod
router.delete('/:id',authMiddleware, deleteProductCtrl);//elimina el prod 
router.put('/:id',authMiddleware, updateProductCtrl);//actualiza el prod



export default router;