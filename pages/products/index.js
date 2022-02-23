import { useEffect, useState } from 'react';
import ProductCard from '../../components/product/product-card';
import Pagination from '../../components/ui/pagination';

const ProductsPage = ({ staticProducts }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);

  useEffect(() => {
    setProducts(staticProducts);
  }, [currentPage]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);

  const changePage = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='main__container'>
      <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>
        Customers also purchased
      </h2>
      <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
        {currentPosts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={products.length}
        changePage={changePage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ProductsPage;
