import mongoose from 'mongoose'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      unique: true,
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(x) {
        if (!validator.isEmail(x)) {
          throw new Error('Email is not Valid pls check it')
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(x) {
        if (x.includes('password')) {
          throw new Error('password cannot contain "password"')
        }
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

UserSchema.methods.genarationToken = async function () {
  const user = this
  const _id = user._id.toString()
  const email = user.email
  const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
    expiresIn: '3h',
  })
  console.log('token of user is ready !')
  return token
}

UserSchema.statics.findBycreditional = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('username or password is wrong  pls try again !')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('username or password is wrong  pls try again !')
  }

  return user
}

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(8)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', UserSchema)
export default User
