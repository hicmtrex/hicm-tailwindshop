import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    totalPrice: { type: Number, required: true, default: 0.0 },
  },
  { timestamps: true }
);

const Address =
  mongoose.models.Address || mongoose.model('Address', addressSchema);

export default Address;
