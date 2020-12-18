import User from '../Models/userModel.js'

//TODO: authUser(login)
//@desc     Auth user and get token
//@route    POST /api/users/login
//@access   public
const authUser = async (req, res) => {
  const { email, password } = req.body
  if (!email && !password) {
    throw new Error('pls enter your email and password')
  }
  try {
    const user = await User.findBycreditional(email, password)
    const tokenOfuser = await user.genarationToken()
    res.send({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: tokenOfuser,
    })
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}
//TODO: getauthprofile(myprofile)
//@desc     Get user profile
//@route    GET /api/users/profile
//@access   private
const getauthprofile = async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(404)
    throw new Error('user not found !!')
  }

  res.status(200).json({
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  })
}
//TODO: addUser(Register)
//@desc     Register a User
//@route    POST /api/users
//@access   public
const addUser = async (req, res) => {
  const { name, email, password } = req.body
  if (!email && !password && !name) {
    throw new Error('pls check your information !')
  }
  try {
    const user = await User.create({
      name,
      email,
      password,
    })
    if (!user) {
      res.status(400)
      throw new Error('your Registeration is fail pls check one more time !')
    }
    const tokenOfuser = await user.genarationToken()

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: tokenOfuser,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

//TODO: updateUserProfile
//@desc     Update the User
//@route    PATCH /api/users/profile
//@access   private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) {
      res.status(404)
      throw new Error('user not found !!')
    }

    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const UpdatedUser = await user.save()

    res.status(200).json({
      _id: UpdatedUser._id,
      name: UpdatedUser.name,
      email: UpdatedUser.email,
      isAdmin: UpdatedUser.isAdmin,
      token: await user.genarationToken(),
    })
  } catch (error) {
    res.status(404)
    throw new Error('user not found !')
  }
}

//TODO: Get All Users
//@desc     Get All Users
//@route    GET /api/users
//@access   private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(404)
    throw new Error('user not found !')
  }
}

//TODO: Delete  a User
//@desc     Delete  a User
//@route    DELETE /api/users/:id
//@access   private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      res.status(404)
      throw new Error(' User not founded')
    }
    await user.remove()
    res.json({ message: 'user deleted ' })
  } catch (error) {
    res.status(404)
    throw new Error('user not found !')
  }
}

//TODO: Get a User By ID
//@desc      Get a User By ID
//@route    GET /api/users/:id
//@access   private/Admin
const getUserByID = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) {
      res.status(404)
      throw new Error('user not found !')
    }
    res.json(user)
  } catch (error) {
    res.status(404)
    throw new Error('user not found !')
  }
}

//TODO: update User By ID
//@desc     Update the User
//@route    PATCH /api/users/:id
//@access   private/Admin
const updateUsertoAdminByID = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      res.status(404)
      throw new Error('user not found !!')
    }

    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin
    const UpdatedUser = await user.save()

    res.status(200).json({
      _id: UpdatedUser._id,
      name: UpdatedUser.name,
      email: UpdatedUser.email,
      isAdmin: UpdatedUser.isAdmin,
    })
  } catch (error) {
    res.status(404)
    throw new Error('user not found !')
  }
}

export {
  authUser,
  getauthprofile,
  addUser,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserByID,
  updateUsertoAdminByID,
}
