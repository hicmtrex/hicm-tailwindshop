import { UserProvider } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import React from 'react';
import CartContext from '../../store/cart-store/cart-context';
import Banner from '../banner';
import Cart from '../cart';
import Navbar from '../navbar';

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <CartContext>
      <UserProvider>
        <Navbar />
        {router.pathname === '/' && <Banner />}
        <main className='home__main'>{children}</main>
        <Cart />
        <div className='py-6 mt-auto text-sm text-center bg-gray-900 text-gray-100'>
          © 2022 Company Co. All rights reserved.
        </div>
      </UserProvider>
    </CartContext>
  );
};

export default Layout;
