import nc from 'next-connect';
import Product from '../../../models/productModel';
import connectDb from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await connectDb();
  const products = await Product.find({});

  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: 'Products not found' });
  }
});

export default handler;
