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
        <div className='cpy_ mt-auto text-center py-3 bg-gray-900 text-gray-100'>
          <p>
            © 2022 All Rights Reserved By{' '}
            <a href='https://html.design/'>Jamstack</a>
          </p>
        </div>
      </UserProvider>
    </CartContext>
  );
};

export default Layout;
