import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Carousel = () => {
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
    <div className='carousel relative  mx-auto'>
      <div className='carousel-inner relative overflow-hidden w-full'>
        {/*Slide 1*/}
        <input
          className='carousel-open'
          type='radio'
          id='carousel-1'
          name='carousel'
          aria-hidden='true'
          hidden
          defaultChecked='checked'
        />
        <div
          className='carousel-item absolute opacity-0'
          style={{ height: '80vh' }}
        >
          <div
            className='block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-right'
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1422190441165-ec2956dc9ecc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80")',
            }}
          >
            <div className='container mx-auto'>
              <div className='flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide'>
                <p className='text-black text-2xl my-4'>
                  Stripy Zig Zag Jigsaw Pillow and Duvet Set
                </p>
                <a
                  className='text-xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black'
                  href='#'
                >
                  view product
                </a>
              </div>
            </div>
          </div>
        </div>
        <label
          htmlFor='carousel-3'
          className='prev control-1 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 left-0 my-auto'
        >
          ‹
        </label>
        <label
          htmlFor='carousel-2'
          className='next control-1 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 right-0 my-auto'
        >
          ›
        </label>
        {/*Slide 2*/}
        <input
          className='carousel-open'
          type='radio'
          id='carousel-2'
          name='carousel'
          aria-hidden='true'
          hidden
        />
        <div
          className='carousel-item absolute opacity-0 bg-cover bg-right'
          style={{ height: '80vh' }}
        >
          <div
            className='block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-right'
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjM0MTM2fQ&auto=format&fit=crop&w=1600&q=80")',
            }}
          >
            <div className='container mx-auto'>
              <div className='flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide'>
                <p className='text-black text-2xl my-4'>
                  Real Bamboo Wall Clock
                </p>
                <a
                  className='text-xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black'
                  href='#'
                >
                  view product
                </a>
              </div>
            </div>
          </div>
        </div>
        <label
          htmlFor='carousel-1'
          className='prev control-2 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 left-0 my-auto'
        >
          ‹
        </label>
        <label
          htmlFor='carousel-3'
          className='next control-2 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 right-0 my-auto'
        >
          ›
        </label>
        {/*Slide 3*/}
        <input
          className='carousel-open'
          type='radio'
          id='carousel-3'
          name='carousel'
          aria-hidden='true'
          hidden
        />
        <div
          className='carousel-item absolute opacity-0'
          style={{ height: '80vh' }}
        >
          <div
            className='block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-bottom'
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1519327232521-1ea2c736d34d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80")',
            }}
          >
            <div className='container mx-auto'>
              <div className='flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide'>
                <p className='text-black text-2xl my-4'>
                  Brown and blue hardbound book
                </p>
                <a
                  className='text-xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black'
                  href='#'
                >
                  view product
                </a>
              </div>
            </div>
          </div>
        </div>
        <label
          htmlFor='carousel-2'
          className='prev control-3 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 left-0 my-auto'
        >
          ‹
        </label>
        <label
          htmlFor='carousel-1'
          className='next control-3 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 right-0 my-auto'
        >
          ›
        </label>
        {/* Add additional indicators for each slide*/}
        <ol className='carousel-indicators'>
          <li className='inline-block mr-3'>
            <label
              htmlFor='carousel-1'
              className='carousel-bullet cursor-pointer block text-4xl text-gray-400 hover:text-gray-900'
            >
              •
            </label>
          </li>
          <li className='inline-block mr-3'>
            <label
              htmlFor='carousel-2'
              className='carousel-bullet cursor-pointer block text-4xl text-gray-400 hover:text-gray-900'
            >
              •
            </label>
          </li>
          <li className='inline-block mr-3'>
            <label
              htmlFor='carousel-3'
              className='carousel-bullet cursor-pointer block text-4xl text-gray-400 hover:text-gray-900'
            >
              •
            </label>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Carousel;
