import express from 'express'
import { authorization, isAdmin } from '../middleware/auth.js'
import {
  authUser,
  getauthprofile,
  addUser,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserByID,
  updateUsertoAdminByID,
} from '../controller/usersController.js'
import { notFound } from '../middleware/errormiddleware.js'

const router = express.Router()

router.route('/').post(addUser).get(authorization, isAdmin, getAllUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get(authorization, getauthprofile)
  .patch(authorization, updateUserProfile)
router
  .route('/:id')
  .delete(authorization, isAdmin, deleteUser)
  .get(authorization, isAdmin, getUserByID)
  .patch(authorization, isAdmin, updateUsertoAdminByID)

router.route('*').get(notFound)
export default router
