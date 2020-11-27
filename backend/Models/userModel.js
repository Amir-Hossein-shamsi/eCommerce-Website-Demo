import mongoose from 'mongoose'
import validator from 'validator'

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
      lowercase: true,
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

const User = mongoose.model('User', UserSchema)
export default User
