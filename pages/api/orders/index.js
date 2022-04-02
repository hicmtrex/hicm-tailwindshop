import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import Order from '../../../models/orderModel';
import connectDb from '../../../utils/db';

const handler = async (req, res) => {
  await connectDb();
  if (req.method === 'GET') {
    const { user } = getSession(req, res);
    const userOrder = await Order.find({ username: user.nickname });

    if (userOrder) {
      res.status(201).json(userOrder);
    } else {
      res.status(400).json({ message: 'something wrong!' });
    }
  }

  if (req.method === 'POST') {
    const { cartItems, shippingAddress, totalPrice } = req.body;

    const { user } = getSession(req, res);
    const order = new Order({
      username: user.nickname,
      cartItems,
      shippingAddress,
      totalPrice,
    });

    const newOrder = await order.save();
    res.status(201).json(newOrder);
  }
};

export default withApiAuthRequired(handler);
