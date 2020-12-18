import express from 'express'
import {
  addOrderItems,
  getOrderByID,
  updateOrderToPaid,
  getMyOrders,
} from '../controller/orderController.js'
import { authorization } from '../middleware/auth.js'
import { notFound } from '../middleware/errormiddleware.js'

const router = express.Router()

router.route('/').post(authorization, addOrderItems)
router.route('/myorders').get(authorization, getMyOrders)
router.route('/:id').get(authorization, getOrderByID)
router.route('/:id/pay').patch(authorization, updateOrderToPaid)

router.route('*').get(notFound)
export default router
