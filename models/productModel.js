import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    images: [String],
    color: [String],
    price: { type: Number, required: true },
    description: { type: String, required: true },
    sizes: [
      {
        name: { type: String },
        inStock: { type: Boolean, default: true },
      },
    ],
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
