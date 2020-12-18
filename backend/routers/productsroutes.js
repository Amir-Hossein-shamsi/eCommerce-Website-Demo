import express from 'express'
import { getProductById, getProducts } from '../controller/productController.js'
import { notFound } from '../middleware/errormiddleware.js'

const router = express.Router()

router.route('/').get(getProducts)
router.route('/:id').get(getProductById)

router.route('*').get(notFound)
export default router
