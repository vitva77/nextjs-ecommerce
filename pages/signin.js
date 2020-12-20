import Head from 'next/head';
import Link from 'next/link';
import { useState, useContext, useEffect } from 'react';
import { DataContext } from '../store/GlobalState';
import { postData } from '../utils/fetchData';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';

const Signin = () => {
  const initialState = {
    email: '',
    password: '',
  };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const router = useRouter();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispatch({ type: 'NOTIFY', payload: {} });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'NOTIFY', payload: { loading: true } });
    const res = await postData('auth/login', userData);

    if (res.err)
      return dispatch({ type: 'NOTIFY', payload: { error: res.err } });
    dispatch({ type: 'NOTIFY', payload: {} });

    dispatch({
      type: 'AUTH',
      payload: {
        token: res.access_token,
        user: res.user,
      },
    });

    Cookie.set('refreshtoken', res.refresh_token, {
      path: 'api/auth/accessToken',
      expires: 7,
    });

    localStorage.setItem('firstLogin', true);
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push('/');
  }, [auth]);

  return (
    <div className='container my-4'>
      <Head>
        <title>Sign in Page</title>
      </Head>

      <h1 className='text-center'>Sign in</h1>
      <form
        className='mx-auto'
        style={{ maxWidth: '340px' }}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className='mb-3'>
          <label htmlFor='exampleInputEmail1' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
            name='email'
            value={email}
            onChange={handleChangeInput}
            autoFocus
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputPassword1' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='exampleInputPassword1'
            name='password'
            value={password}
            onChange={handleChangeInput}
          />
        </div>
        <button type='submit' className='btn btn-dark w-100'>
          Login
        </button>
        <p className='my-2'>
          You don't have an account?{' '}
          <Link href='/register'>
            <a>Register Now</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
