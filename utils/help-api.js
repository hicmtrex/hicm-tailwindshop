import axios from 'axios';

export const baseUrl = 'http://localhost:3000';

export const getProducts = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/products`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getRandomProduct = async () => {
  try {
    const { data } = await axios.get(
      'http://localhost:3000/api/products/random'
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const getProductById = async (id) => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/products/${id}`);
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
