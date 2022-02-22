import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import nc from 'next-connect';
import Order from '../../../models/orderModel';
import connectDb from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
  onError: onError,
});

handler.get(async (req, res) => {
  const { user } = getSession(req, res);
  await connectDb();
  const userOrder = await Order.find({ username: user.nickname });

  if (userOrder) {
    res.status(201).json(userOrder);
  } else {
    res.status(400).json({ message: 'something wrong!' });
  }
});

handler.post(async (req, res) => {
  const { cartItems, shippingAddress, totalPrice } = req.body;
  await connectDb();
  const { user } = getSession(req, res);

  const order = new Order({
    username: user.nickname,
    cartItems,
    shippingAddress,
    totalPrice,
  });

  const newOrder = await order.save();
  res.status(201).json(newOrder);
});

export default withApiAuthRequired(handler);
