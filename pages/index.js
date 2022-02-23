import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import DownBanner from '../components/down-banner';
import Footer from '../components/footer';
import { getProducts } from '../utils/help-api';
import ProductsPage from './products';

const HomePage = ({ staticProducts }) => {
  const router = useRouter();
  return (
    <>
      <div className='bg-white' id='products'>
        <Toaster position='top-center' reverseOrder={false} />
        <ProductsPage staticProducts={staticProducts} />
      </div>
      <DownBanner />
      <Footer />
    </>
  );
};

export const getStaticProps = async () => {
  const staticProducts = await getProducts();

  return {
    props: {
      staticProducts,
    },
    revalidate: 600,
  };
};

export default HomePage;
