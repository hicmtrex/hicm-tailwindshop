import { Toaster } from 'react-hot-toast';
import useSWR from 'swr';
import DownBanner from '../components/down-banner';
import Footer from '../components/footer';
import ProductsPage from './products';

const fetcher = async (url) => {
  const res = await fetch(url);
  return res.json();
};

const HomePage = () => {
  const url = `http://localhost:3000/api/products`;
  const { data, error } = useSWR(url, fetcher);

  const staticProducts = data;
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
