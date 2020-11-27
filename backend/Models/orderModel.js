import mongoose from 'mongoose'
import validator from 'validator'

const OrderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItem: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {},
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
