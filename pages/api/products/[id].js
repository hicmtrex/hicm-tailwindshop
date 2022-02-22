import nc from 'next-connect';
import Product from '../../../models/productModel';
import connectDb from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await connectDb();
  const product = await Product.findById(req.query.id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'product not found' });
  }
});

export default handler;
