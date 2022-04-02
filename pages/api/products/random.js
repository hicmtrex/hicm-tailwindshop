import Product from '../../../models/productModel';
import connectDb from '../../../utils/db';

const handler = async (req, res) => {
  await connectDb();
  if (req.method === 'GET') {
    const products = await Product.aggregate([{ $sample: { size: 1 } }]);

    if (products) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: 'Products not found' });
    }
  }
};

export default handler;
