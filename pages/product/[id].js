import Head from 'next/head';
import { useState } from 'react';
import { getData } from '../../utils/fetchData';

const DetailProduct = (props) => {
  const [product] = useState(props.product);
  const [tab, setTab] = useState(0);

  const isActive = (index) => {
    if (tab === index) return ' active';
    return '';
  };

  return (
    <div className='container my-4'>
      <Head>
        <title>Detail Product</title>
      </Head>
      <div className='row detail_page'>
        <div className='col-md-6 mb-4'>
          <img
            src={product.images[tab].url}
            alt={product.images[tab].url}
            className='d-block img-thumbnail w-100'
            style={{ height: '350px', objectFit: 'cover' }}
          />
          <div className='row mx-0 mt-2'>
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={img.url}
                className={'img-thumbnail' + isActive(index)}
                style={{
                  width: '20%',
                  height: '80px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
                onClick={() => setTab(index)}
              />
            ))}
          </div>
        </div>
        <div className='col-md-6'>
          <h2 className='text-uppercase'>{product.title}</h2>
          <h5 className='text-danger'>${product.price}</h5>
          <div className='d-flex justify-content-between'>
            {product.inStock > 0 ? (
              <h6 className='text-danger'>In Stock: {product.inStock}</h6>
            ) : (
              <h6 className='text-secondary'>Out Stock</h6>
            )}
            <h6 className='text-danger'>Sold: {product.sold}</h6>
          </div>
          <div className='my-2'>{product.description}</div>
          <div className='my-2'>
            {product.content}
            {product.content}
            {product.content}
          </div>
          <button
            type='button'
            className='btn btn-primary d-block my-3 px-5 btn-lg'
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`product/${id}`);
  // server side rendering
  return {
    props: { product: res.product }, // will be passed to the page component as props
  };
}

export default DetailProduct;
