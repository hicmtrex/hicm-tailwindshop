import nc from 'next-connect';
import Product from '../../../models/productModel';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const products = await Product.aggregate([{ $sample: { size: 1 } }]);
  await db.disconnect();

  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: 'Products not found' });
  }
});

export default handler;
