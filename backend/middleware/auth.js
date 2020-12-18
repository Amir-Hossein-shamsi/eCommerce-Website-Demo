import jwt from 'jsonwebtoken'
import User from '../Models/userModel.js'

const authorization = async (req, res, next) => {
  let token
  try {
    token = req.headers.authorization.split(' ')[1]
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decodedToken._id)
      .select('-password')
      .select('-isAdmin')
    console.log('authorization is done')

    next()
  } catch (error) {
    res
      .status(401)
      .send('something is wrong about authorization pls check out it !')
  }
}

const isAdmin = async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized  as an Admin ')
  }
}

export { authorization, isAdmin }
