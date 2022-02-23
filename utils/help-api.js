export const server =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'hicm-tailwindshop.vercel.app';

export const getProducts = async () => {
  try {
    const res = await fetch(`${server}/api/products`);
    return res.json();
  } catch (error) {
    return error;
  }
};

export const getRandomProduct = async () => {
  try {
    const res = await fetch(`${server}/api/products/random`);
    return res.json();
  } catch (error) {
    return error;
  }
};

export const getProductById = async (id) => {
  try {
    const res = await fetch(`${server}/api/products/${id}`);
    return res.json();
  } catch (error) {
    return error;
  }
};

export const errorHandler = (error) => {
  return error.response.data
    ? error.response.data.message
    : error.message.toString();
};
