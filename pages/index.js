import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import useSWR from 'swr';
import DownBanner from '../components/down-banner';
import Footer from '../components/footer';
import Loader from '../components/ui/loader';
import ProductsPage from './products';

const fetcher = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

const HomePage = () => {
  const url = `/api/products`;
  const { data, error } = useSWR(url, fetcher);

  const staticProducts = data;
  if (!data || error) return <Loader />;

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

// export const getStaticProps = async () => {
//   const staticProducts = await getProducts();

//   return {
//     props: {
//       staticProducts,
//     },
//     revalidate: 600,
//   };
// };

export default HomePage;
