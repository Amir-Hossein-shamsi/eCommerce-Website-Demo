import Order from '../Models/orderModel.js'

//TODO: Create New order
//@desc     create New order
//@route    POST /api/orders
//@access   private
const addOrderItems = async (req, res) => {
  const {
    orderItem,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItem && orderItem.length() === 0) {
    res.status(400)
    throw new Error('No order items')
  }
  try {
    const order = new Order({
      user: req.user._id,
      orderItem,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
    const createdorder = await order.save()
    res.status(201).json(createdorder)
  } catch (error) {
    res.status(400).json(error.message)
  }
}

//TODO: Get order By ID
//@desc     get order By ID
//@route    GET /api/orders/:id
//@access   private
const getOrderByID = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    )
    if (!order) {
      res.status(404)
      throw new Error('Order not founded')
    }
    res.json(order)
  } catch (error) {
    res.status(400).json(error.message)
  }
}

//TODO: Update order to paid
//@desc     Update order to paid
//@route    PATCH /api/orders/:id/pay
//@access   private
const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) {
      res.status(404)
      throw new Error('Order not founded')
    }
    order.isPaid = true
    order.paidAT = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } catch (error) {
    res.status(400).json(error.message)
  }
}

//TODO: Get Logged in User orders(myorders)
//@desc     Get Logged in User orders
//@route    PATCH /api/orders/myorders
//@access   private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
    if (!orders) {
      res.send('there is no any orders By this email !')
    }
    res.json(orders)
  } catch (error) {
    res.status(400).json(error.message)
  }
}

export { addOrderItems, getOrderByID, updateOrderToPaid, getMyOrders }
