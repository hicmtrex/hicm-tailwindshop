import { Toaster } from 'react-hot-toast';
import DownBanner from '../components/down-banner';
import Footer from '../components/footer';
import { getProducts } from '../utils/help-api';
import ProductsPage from './products';

const HomePage = ({ products }) => {
  return (
    <>
      <div className='bg-white' id='products'>
        <Toaster position='top-center' reverseOrder={false} />
        <ProductsPage products={products} />
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
      products: staticProducts,
    },
    revalidate: 600,
  };
};

export default HomePage;
