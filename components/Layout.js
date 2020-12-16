import NavBar from './NavBar';
import Notify from './Notify';

function Layout({ children }) {
  return (
    <>
      <NavBar />
      <Notify />
      <div className='container'>{children}</div>
    </>
  );
}

export default Layout;
