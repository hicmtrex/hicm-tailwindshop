/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import CartStore from '../store/cart-store/cart-store';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Products', href: '/#products', current: false },
  { name: 'About', href: '/#about', current: false },
  { name: 'Contact', href: '/#contact', current: false },
];

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const Navbar = () => {
  const { cartItems, setOpen, userLogout } = useContext(CartStore);
  const { user, isLoading } = useUser();

  return (
    <Disclosure as='nav' className='bg-gray-900'>
      {({ open }) => (
        <>
          <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
            <div className='relative flex items-center justify-between h-16'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex-shrink-0 flex items-center'>
                  <img
                    className='hidden lg:block h-8 w-auto'
                    src='/images/LogoMakr-4dZt7Q.png'
                    alt='Workflow'
                  />
                </div>
                <div className='hidden sm:block sm:ml-6'>
                  <div className='flex space-x-4'>
                    <Link href='/' passHref>
                      <a className='text-gray-100 hover:bg-gray-700 hover:text-white text-md'>
                        Home
                      </a>
                    </Link>
                    <Link href='/#products' passHref>
                      <a className='text-gray-100 hover:bg-gray-700 hover:text-white text-md'>
                        Products
                      </a>
                    </Link>
                    <Link href='/#about' passHref>
                      <a className='text-gray-100 hover:bg-gray-700 hover:text-white text-md'>
                        About
                      </a>
                    </Link>
                    <Link href='/contact' passHref>
                      <a className='text-gray-100 hover:bg-gray-700 hover:text-white text-md'>
                        Contact
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className='absolute text-white inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                {cartItems.length}
                <button
                  type='button'
                  onClick={() => setOpen(true)}
                  className='bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                >
                  {/* <span className='sr-only'>View notifications</span> */}
                  <ShoppingCartIcon className='h-6 w-6' aria-hidden='true' />
                </button>

                {isLoading && (
                  <div className='flex justify-center items-center'>
                    <div
                      className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full'
                      role='status'
                    >
                      <span className='visually-hidden'></span>
                    </div>
                  </div>
                )}

                {!user ? (
                  <a
                    href='/api/auth/login'
                    type='button'
                    className='bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                  >
                    Login
                  </a>
                ) : (
                  <Menu as='div' className='ml-3 relative'>
                    <div>
                      <Menu.Button className='bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                        <span className='sr-only'>Open user menu</span>
                        <img
                          className='h-8 w-8 rounded-full'
                          src={user?.picture}
                          alt=''
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href='/users/profile'
                              className={classNames(
                                active ? 'bg-gray-100 cursor-pointer' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                              passHref
                            >
                              <Menu.Item>
                                {({ active }) => (
                                  <span
                                    className={classNames(
                                      active
                                        ? 'bg-gray-100 cursor-pointer'
                                        : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Your Profile
                                  </span>
                                )}
                              </Menu.Item>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              className={classNames(
                                active ? 'bg-gray-100 cursor-pointer' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Settings
                            </span>
                          )}
                        </Menu.Item>
                        <Link href={'/api/auth/logout'} passHref>
                          <Menu.Item onClick={() => userLogout()}>
                            {({ active }) => (
                              <span
                                className={classNames(
                                  active ? 'bg-gray-100 cursor-pointer' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Sign out
                              </span>
                            )}
                          </Menu.Item>
                        </Link>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
                {/* Profile dropdown */}
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as='a'
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
