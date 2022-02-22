import { useUser } from '@auth0/nextjs-auth0';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ACTIONS } from '../../store/cart-store/cart-context';
import CartStore from '../../store/cart-store/cart-store';
import { getError } from '../../utils/error';

const PlaceOrder = () => {
  const { cartItems, shippingAddress, dispatch } = useContext(CartStore);
  const { user } = useUser();
  const router = useRouter();
  const itemsPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  const shippingPrice = itemsPrice >= 200 ? 0 : 20;

  const discount = itemsPrice >= 200 ? '%18' : '%10';
  const discountPrice =
    itemsPrice >= 200
      ? (itemsPrice * 0.18).toFixed(2)
      : (itemsPrice * 0.1).toFixed(2);

  const taxPrice = (itemsPrice * 0.05).toFixed(2);

  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice) -
    Number(discountPrice)
  ).toFixed(2);

  const createOrder = async () => {
    const order = {
      cartItems,
      shippingAddress,
      totalPrice,
    };
    if (window.confirm(`Your order price ${totalPrice}`)) {
      try {
        const res = await axios.post('/api/orders', order, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.data) {
          toast.success(`Thank you for your order ${user?.name}`);
          dispatch({ type: ACTIONS.CLEAR_CART });
          router.push('/users/profile');
        }
      } catch (error) {
        toast.error(getError(error));
      }
    }
  };

  useEffect(() => {
    if (!shippingAddress) {
      router.back();
    }
    if (cartItems.length === 0) {
      router.push('/');
    }
  }, [shippingAddress]);

  return (
    <div className='py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto'>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='flex justify-start item-start space-y-2 flex-col'>
        <h1 className='text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800'>
          Order #13432
        </h1>
        <p className='text-base dark:text-gray-300 font-medium leading-6 text-gray-600'>
          21st Mart 2021 at 10:34 PM
        </p>
      </div>
      <div className='mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0'>
        <div className='flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8'>
          <div className='flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full'>
            <p className='text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800'>
              Customer’s Cart
            </p>
            {cartItems.length === 0 && (
              <div className='mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full '>
                <p className='text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800'>
                  Your Cart is empty
                </p>
              </div>
            )}

            {cartItems.map((item) => (
              <div
                key={item.id}
                className='mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full'
              >
                <div className='pb-4 md:pb-8 w-full md:w-40'>
                  <img className='w-full ' src={item.image} alt='dress' />
                </div>
                <div className='border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0'>
                  <div className='w-full flex flex-col justify-start items-start space-y-8'>
                    <h3 className='text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800'>
                      {item.name}
                    </h3>
                    <div className='flex justify-start items-start flex-col space-y-2'>
                      <p className='text-sm dark:text-white leading-none text-gray-800'>
                        <span className='dark:text-gray-400 text-gray-300'>
                          Size:{' '}
                        </span>{' '}
                        {item.size}
                      </p>
                      <p className='text-sm dark:text-white leading-none text-gray-800'>
                        <span className='dark:text-gray-400 text-gray-300'>
                          Color:{' '}
                        </span>{' '}
                        {item.color}
                      </p>
                    </div>
                  </div>
                  <div className='flex justify-between space-x-8 items-start w-full'>
                    <p className='text-base dark:text-white xl:text-lg leading-6'>
                      ${item.price}
                      <span className='text-red-300 line-through'>
                        {' '}
                        {(item.price + 10).toFixed(2)}
                      </span>
                    </p>
                    <p className='text-base dark:text-white xl:text-lg leading-6 text-gray-800'>
                      Qty {item.qty}
                    </p>
                    <p className='text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800'>
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-center flex-col md:flex-row  items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8'>
            <div className='flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6'>
              <h3 className='text-xl dark:text-white font-semibold leading-5 text-gray-800'>
                Summary
              </h3>
              <div className='flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4'>
                <div className='flex justify-between w-full'>
                  <p className='text-base dark:text-white leading-4 text-gray-800'>
                    Subtotal
                  </p>
                  <p className='text-base dark:text-gray-300 leading-4 text-gray-600'>
                    ${itemsPrice}
                  </p>
                </div>
                <div className='flex justify-between items-center w-full'>
                  <p className='text-base dark:text-white leading-4 text-gray-800'>
                    Discount
                  </p>
                  <p className='text-base dark:text-gray-300 leading-4 text-gray-600'>
                    -${discountPrice} ({discount})
                  </p>
                </div>
                <div className='flex justify-between items-center w-full'>
                  <p className='text-base dark:text-white leading-4 text-gray-800'>
                    Shipping
                  </p>
                  <p className='text-base dark:text-gray-300 leading-4 text-gray-600'>
                    ${shippingPrice}
                  </p>
                </div>
                <div className='flex justify-between items-center w-full'>
                  <p className='text-base dark:text-white leading-4 text-gray-800'>
                    Tax
                  </p>
                  <p className='text-base dark:text-gray-300 leading-4 text-gray-600'>
                    ${taxPrice}
                  </p>
                </div>
              </div>
              <div className='flex justify-between items-center w-full'>
                <p className='text-base dark:text-white font-semibold leading-4 text-gray-800'>
                  Total
                </p>
                <p className='text-base dark:text-gray-300 font-semibold leading-4 text-gray-600'>
                  ${totalPrice}
                </p>
              </div>
            </div>
            <div className='flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6'>
              <h3 className='text-xl dark:text-white font-semibold leading-5 text-gray-800'>
                Shipping
              </h3>
              <div className='flex justify-between items-start w-full'>
                <div className='flex justify-center items-center space-x-4'>
                  <div className='w-8 h-8'>
                    <img
                      className='w-full h-full'
                      alt='logo'
                      src='https://i.ibb.co/L8KSdNQ/image-3.png'
                    />
                  </div>
                  <div className='flex flex-col justify-start items-center'>
                    <p className='text-lg leading-6 dark:text-white font-semibold text-gray-800'>
                      DPD Delivery
                      <br />
                      <span className='font-normal'>
                        Delivery with 24 Hours
                      </span>
                    </p>
                  </div>
                </div>
                <p className='text-lg font-semibold leading-6 dark:text-white text-gray-800'>
                  $8.00
                </p>
              </div>
              <div className='w-full flex justify-center items-center'>
                <button className='hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white'>
                  View Carrier Details
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col'>
          <h3 className='text-xl dark:text-white font-semibold leading-5 text-gray-800'>
            Customer
          </h3>
          <div className='flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0'>
            <div className='flex flex-col justify-start items-start flex-shrink-0'>
              <div className='flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200'>
                <img
                  src={user?.picture}
                  className='rounded-lg'
                  width={80}
                  alt='avatar'
                />
                <div className='flex justify-start items-start flex-col space-y-2'>
                  <p className='text-base dark:text-white font-semibold leading-4 text-left text-gray-800'></p>
                  <p className='text-sm dark:text-gray-300 leading-5 text-gray-600'>
                    {user?.name}
                  </p>
                </div>
              </div>
              <div className='flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full'>
                <img
                  className='dark:hidden'
                  src='https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1.svg'
                  alt='email'
                />
                <img
                  className='hidden dark:block'
                  src='https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1dark.svg'
                  alt='email'
                />
                <p className='cursor-pointer text-sm leading-5 '>
                  {user?.email}
                </p>
              </div>
            </div>
            <div className='flex justify-between items-stretch w-full flex-col mt-6 md:mt-0'>
              <div className='flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start'>
                <div className='flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8'>
                  <p className='text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800'>
                    Shipping Address
                  </p>
                  <p className='w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600'>
                    {/* 180 North King Street, Northhampton MA 1060 */}
                    {shippingAddress?.address}, {shippingAddress?.state}{' '}
                    {shippingAddress?.city} {shippingAddress?.postalCode} -{' '}
                    {shippingAddress?.country}
                  </p>
                </div>
                {/* <div className='flex justify-center md:justify-start items-center md:items-start flex-col space-y-4'>
                <p className='text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800'>
                  Billing Address
                </p>
                <p className='w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600'>
                  180 North King Street, Northhampton MA 1060
                </p>
              </div> */}
              </div>
              {/* <div className='mt-5'>
              <PayPalButton
                amount={5000}
                onSuccess={() => console.log('gg')}
              />
            </div> */}
              <div className='flex w-full justify-center items-center md:justify-start md:items-start'>
                <button
                  onClick={createOrder}
                  className=' rounded mt-10 md:mt-5 text-white bg-indigo-600 hover:bg-indigo-700 hover:bg-opacity-80  py-3 hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2  w-96 2xl:w-full text-base font-medium leading-4 sm:w-full '
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
