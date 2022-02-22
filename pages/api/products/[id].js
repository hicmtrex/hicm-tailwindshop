import nc from 'next-connect';
import Product from '../../../models/productModel';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();

  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).json({ message: 'product not found' });
  }
});

export default handler;
