import { useRouter } from 'next/router';
import Banner from '../components/banner';
import Cart from '../components/cart';
import Navbar from '../components/navbar';
import CartContext from '../store/cart-store/cart-context';
import { UserProvider } from '@auth0/nextjs-auth0';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <CartContext>
      <UserProvider>
        <Navbar />
        {router.pathname === '/' && <Banner />}
        <main className='home__main'>
          <Component {...pageProps} />

          <Cart />
        </main>
        <div className='py-6 mt-auto text-sm text-center bg-gray-900 text-gray-100'>
          © 2022 Company Co. All rights reserved.
        </div>
      </UserProvider>
    </CartContext>
  );
}

export default MyApp;
