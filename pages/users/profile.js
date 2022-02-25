import { useUser } from '@auth0/nextjs-auth0';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { LOCAL_STORAGE } from '../../store/cart-store/cart-context';
import CartStore from '../../store/cart-store/cart-store';

const Profile = () => {
  const { user } = useUser();
  const [show, setShow] = useState(false);
  const [orders, setOrders] = useState([]);

  const { shippingAddress } = useContext(CartStore);

  const getUserOrders = async () => {
    try {
      const { data } = await axios.get('/api/orders');
      setOrders(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUserOrders();
    localStorage.setItem(
      LOCAL_STORAGE.TAILWIND_NEXT_ADDRESS,
      JSON.stringify(shippingAddress)
    );
  }, []);

  return (
    <div className='container mx-auto my-2 p-5'>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='md:flex no-wrap md:-mx-2 '>
        {/* Left Side */}
        <div className='w-full md:w-3/12 md:mx-2'>
          {/* Profile Card */}
          <div className='bg-white p-3 border-t-4 border-gray-800'>
            <div className='image overflow-hidden'>
              <img className='h-80 w-50 mx-auto' src={user?.picture} alt='' />
            </div>
            <h1 className='text-gray-900 font-bold text-xl leading-8 my-1'>
              {user?.name}
            </h1>
            <h3 className='text-gray-600 font-lg text-semibold leading-6'>
              {user?.email}
            </h3>
            <p className='text-sm text-gray-500 hover:text-gray-600 leading-6'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur
              non deserunt
            </p>
            <ul className='bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm'>
              <li className='flex items-center py-3'>
                <span>Status</span>
                <span className='ml-auto'>
                  <span className='bg-green-500 py-1 px-2 rounded text-white text-sm'>
                    Active
                  </span>
                </span>
              </li>
              <li className='flex items-center py-3'>
                <span>Member since</span>
                <span className='ml-auto'>
                  {user?.updated_at.substring(0, 10)}
                </span>
              </li>
            </ul>
          </div>
          {/* End of profile card */}
          <div className='my-4' />

          {/* End of friends card */}
        </div>
        {/* Right Side */}
        <div className='w-full md:w-9/12 mx-2'>
          {/* Profile tab */}
          {/* About Section */}
          <div className='bg-white p-3 shadow-sm rounded-sm'>
            <div className='flex items-center space-x-2 font-semibold text-gray-900 leading-8'>
              <span clas='text-green-500'>
                <svg
                  className='h-5'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                  />
                </svg>
              </span>
              <span className='tracking-wide'>About</span>
            </div>
            <div className='text-gray-700'>
              <div className='grid md:grid-cols-2 text-sm'>
                <div className='grid grid-cols-2'>
                  <div className='px-4 py-2 font-semibold'>First Name</div>
                  <div className='px-4 py-2'>{user?.given_name}</div>
                </div>
                <div className='grid grid-cols-2'>
                  <div className='px-4 py-2 font-semibold'>Last Name</div>
                  <div className='px-4 py-2'>{user?.family_name}</div>
                </div>
                <div className='grid grid-cols-2'>
                  <div className='px-4 py-2 font-semibold'>Current Address</div>
                  <div className='px-4 py-2'>{shippingAddress?.address}</div>
                </div>
                <div className='grid grid-cols-2'>
                  <div className='px-4 py-2 font-semibold'>City</div>
                  <div className='px-4 py-2'>{shippingAddress?.city}</div>
                </div>
                <div className='grid grid-cols-2'>
                  <div className='px-4 py-2 font-semibold'>Posta Code</div>
                  <div className='px-4 py-2'>{shippingAddress?.postalCode}</div>
                </div>
                <div className='grid grid-cols-2'>
                  <div className='px-4 py-2 font-semibold'>Country</div>
                  <div className='px-4 py-2'>{shippingAddress?.country}</div>
                </div>
                <div className='grid grid-cols-2'>
                  <div className='px-4 py-2 font-semibold'>Email.</div>
                  <div className='px-4 py-2'>
                    <a
                      className='text-blue-800 text-sm'
                      href='mailto:jane@example.com'
                    >
                      {user?.email}
                    </a>
                  </div>
                </div>
                <div className='grid grid-cols-2'>
                  <div className='px-4 py-2 font-semibold'>Phone</div>
                  <div className='px-4 py-2'>{shippingAddress?.phone}</div>
                </div>
              </div>
            </div>

            <div className='border-t border-b py-4 mt-7 border-gray-200'>
              <div
                onClick={() => setShow(!show)}
                className='flex justify-between items-center cursor-pointer'
              >
                <p className='text-xl px-5 leading-4 text-gray-800'>
                  My Orders List
                </p>
                <button
                  className='
                                  cursor-pointer
                                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
                                  rounded
                              '
                  aria-label='show or hide'
                >
                  <svg
                    className={
                      'transform ' + (show ? 'rotate-180' : 'rotate-0')
                    }
                    width='10'
                    height='6'
                    viewBox='0 0 10 6'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M9 1L5 5L1 1'
                      stroke='#4B5563'
                      strokeWidth='1.25'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
              </div>
              {orders.map((order, index) => (
                <div
                  key={order._id}
                  className={
                    ' border-2 border-b-2 pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 ' +
                    (show ? 'block' : 'hidden')
                  }
                  id='sect'
                >
                  <h1 className='text-2xl text-purple-900 pl-2'>
                    Order: {index + 1}
                  </h1>
                  <p className='text-xl pl-2'>Order Items:</p>
                  <div className='flex justify-end text-xl'>
                    {' '}
                    Total Price: ${order.totalPrice}{' '}
                  </div>
                  {order.cartItems.map((item) => (
                    <div
                      key={item.id}
                      className=' mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full'
                    >
                      <div className='pb-4 md:pb-8 w-full md:w-40'>
                        <img
                          className='w-20 h20 p-2 '
                          src={item.image}
                          alt='dress'
                        />
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
                              {item.size.name}
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
              ))}
            </div>
          </div>
          {/* End of about section */}
          <div className='my-2' />
          {/* Experience and education */}
        </div>
      </div>
    </div>
  );
};

export default withPageAuthRequired(Profile);
