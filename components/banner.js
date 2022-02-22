import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const Banner = () => {
  const [randomProduct, setRandomProduct] = useState([]);

  const getRandomProduct = async () => {
    try {
      const { data } = await axios.get('/api/products/random');
      setRandomProduct(data);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getRandomProduct();
  }, []);
  console.log(randomProduct);
  return (
    <section className=' bg-gray-800 text-gray-100 '>
      <div className='container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between'>
        <div className='flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left'>
          <h1 className='text-4xl font-bold leading-none sm:text-5xl'>
            {randomProduct[0]?.name}
          </h1>
          <p className='mt-6 mb-8 text-lg sm:mb-12'>
            {randomProduct[0]?.description.substring(0, 100)}
          </p>
          <div className='flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start'>
            <p className='px-8 py-3 text-lg font-semibold rounded dark:bg-violet-400 dark:text-gray-900'>
              ${randomProduct[0]?.price}
            </p>

            <Link href={`/products/${randomProduct[0]?._id}`} passHref>
              <a className='px-8 py-3 text-lg font-semibold border rounded dark:border-gray-100'>
                Buy Now
              </a>
            </Link>
          </div>
        </div>
        <div className='flex items-center justify-center mr-20 p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128'>
          <img
            src={randomProduct[0]?.images[0]}
            alt='pictures'
            className='object-contain h-40 sm:h-80 mr-5 lg:h-96 xl:h-112 2xl:h-128  rounded-md bg-gray-500'
          />
          <img
            src={randomProduct[0]?.images[1]}
            alt='pictures'
            className='object-contain h-40 sm:h-80  lg:h-96 xl:h-112 2xl:h-128  rounded-md bg-gray-500'
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
