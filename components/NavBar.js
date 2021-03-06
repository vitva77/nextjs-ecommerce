import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DataContext } from '../store/GlobalState';
import Cookie from 'js-cookie';

function NavBar() {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const isActive = (r) => {
    if (r === router.pathname) {
      return ' active';
    } else {
      return '';
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    Cookie.remove('refreshtoken', { path: 'api/auth/accessToken' });
    localStorage.removeItem('firstLogin');
    dispatch({ type: 'AUTH', payload: {} });
    dispatch({ type: 'NOTIFY', payload: {} });
    router.push('/signin');
  };

  const noLoggedRouter = () => {
    return (
      <>
        <li className='nav-item'>
          <Link href='/signin'>
            <a className={'nav-link' + isActive('/signin') + ' me-2'}>
              <svg className='bi' width='16' height='16' fill='currentColor'>
                <use xlinkHref='/images/icons/bootstrap-icons.svg#person-fill' />
              </svg>{' '}
              Sign in
            </a>
          </Link>
        </li>
        <li className='nav-item'>
          <Link href='/register'>
            <a
              className={'btn btn-outline-light' + isActive('/register')}
              role='button'
            >
              Register
            </a>
          </Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <li className='nav-item dropdown'>
        <a
          className='nav-link dropdown-toggle d-flex align-items-center'
          href='#'
          id='navbarDropdownMenuLink'
          role='button'
          data-bs-toggle='dropdown'
          aria-expanded='false'
        >
          <img
            src={auth.user.avatar}
            alt={auth.user.name}
            style={{
              borderRadius: '50%',
              height: '20px',
              width: '20px',
              marginRight: '3px',
            }}
          />
          {auth.user.name}
        </a>
        <ul
          className='dropdown-menu dropdown-menu-end'
          aria-labelledby='navbarDropdownMenuLink'
        >
          <li>
            <a className='dropdown-item' href='#'>
              Profile
            </a>
          </li>
          <li>
            <a className='dropdown-item' onClick={handleLogout} href='#'>
              Logout
            </a>
          </li>
        </ul>
      </li>
    );
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <div className='container'>
        <Link href='/'>
          <a className='navbar-brand'>
            <svg className='bi' width='16' height='16' fill='currentColor'>
              <use xlinkHref='/images/icons/bootstrap-icons.svg#bag-check-fill' />
            </svg>{' '}
            <strong>DEVAT</strong>
          </a>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse navbar-collapse justify-content-end'
          id='navbarNavDropdown'
        >
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link href='/cart'>
                <a className={'nav-link' + isActive('/cart') + ' me-4'}>
                  <svg
                    className='bi'
                    width='16'
                    height='16'
                    fill='currentColor'
                  >
                    <use xlinkHref='/images/icons/bootstrap-icons.svg#cart-fill' />
                  </svg>{' '}
                  Cart
                </a>
              </Link>
            </li>
            {Object.keys(auth).length === 0 ? noLoggedRouter() : loggedRouter()}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
