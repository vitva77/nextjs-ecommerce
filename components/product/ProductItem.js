import Link from 'next/link';

const ProductItem = ({ product }) => {
  const userLink = () => {
    return (
      <>
        <Link href={`/product/${product._id}`}>
          <a className='btn btn-secondary flex-fill me-1'>View</a>
        </Link>
        <button className='btn btn-primary flex-fill ms-1'>Buy</button>
      </>
    );
  };

  return (
    <div className='card' style={{ width: '18rem' }}>
      <img
        src={product.images[0].url}
        className='card-img-top'
        alt={product.images[0].url}
      />
      <div className='card-body'>
        <h5 className='card-title text-capitalize' title={product.title}>
          {product.title}
        </h5>
        <div className='d-flex justify-content-between'>
          <h6 className='text-danger'>${product.price}</h6>
          {product.inStock > 0 ? (
            <h6 className='text-danger'>In Stock: {product.inStock}</h6>
          ) : (
            <h6 className='text-secondary'>Out Stock</h6>
          )}
        </div>
        <p className='card-text' title={product.description}>
          {product.description}
        </p>
        <div className='d-flex justify-content-between'>{userLink()}</div>
      </div>
    </div>
  );
};

export default ProductItem;
