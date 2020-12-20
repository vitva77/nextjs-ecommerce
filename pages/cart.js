import Head from 'next/head';

const Cart = () => {
  return (
    <div className='container my-4'>
      <Head>
        <title>Cart Page</title>
      </Head>
      <h1>Cart</h1>
      <p>Your cart is empty.</p>
    </div>
  );
};

export default Cart;
