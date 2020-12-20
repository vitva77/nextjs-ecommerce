import Head from 'next/head';
import { getData } from '../utils/fetchData';
import { useState } from 'react';
import ProductItem from '../components/product/ProductItem';

const Home = (props) => {
  const [products, setProducts] = useState(props.products);
  // console.log(products);

  return (
    <div className='container my-4'>
      <Head>
        <title>Home Page</title>
      </Head>
      <div className='products'>
        {products.length === 0 ? (
          <h2>No Products</h2>
        ) : (
          products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await getData('product');
  // server side rendering
  return {
    props: {
      products: res.products,
      result: res.result,
    }, // will be passed to the page component as props
  };
}

export default Home;
