import express from 'express'
import {
  addOrderItems,
  getOrderByID,
  updateOrderToPaid,
  updateOrderToDeliver,
  getMyOrders,
  getAllOrders,
} from '../controller/orderController.js'
import { authorization, isAdmin } from '../middleware/auth.js'
import { notFound } from '../middleware/errormiddleware.js'

const router = express.Router()

router
  .route('/')
  .post(authorization, addOrderItems)
  .get(authorization, isAdmin, getAllOrders)
router.route('/myorders').get(authorization, getMyOrders)
router.route('/:id').get(authorization, getOrderByID)
router.route('/:id/pay').patch(authorization, updateOrderToPaid)
router.route('/:id/deliver').patch(authorization, isAdmin, updateOrderToDeliver)

router.route('*').get(notFound)
export default router
