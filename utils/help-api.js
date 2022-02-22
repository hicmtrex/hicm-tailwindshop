import axios from 'axios';

export const server =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'hicm-tailwindshop.vercel.app';

export const getProducts = async () => {
  try {
    const { data } = await axios.get(`${server}/api/products`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getRandomProduct = async () => {
  try {
    const { data } = await axios.get(`${server}/api/products/random`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getProductById = async (id) => {
  try {
    const { data } = await axios.get(`${server}/api/products/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const errorHandler = (error) => {
  return error.response.data
    ? error.response.data.message
    : error.message.toString();
};
