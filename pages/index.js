import { Toaster } from 'react-hot-toast';
import DownBanner from '../components/down-banner';
import Footer from '../components/footer';
import ProductCard from '../components/product/product-card';
import Pagination from '../components/ui/pagination';
import { getProducts } from '../utils/help-api';

const HomePage = ({ products }) => {
  return (
    <>
      <div className='bg-white' id='products'>
        <Toaster position='top-center' reverseOrder={false} />
        <div className='main__container'>
          <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>
            Customers also purchased
          </h2>
          <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <Pagination />
        </div>
      </div>
      <DownBanner />
      <Footer />
    </>
  );
};

export const getStaticProps = async () => {
  const products = await getProducts();

  return {
    props: {
      products,
    },
    revalidate: 600,
  };
};

export default HomePage;
