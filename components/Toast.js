import styles from './Toast.module.css';

const Toast = ({ msg, handleShow, bgColor }) => {
  return (
    <div
      className={`${styles.toast} text-white ${bgColor}`}
      role='alert'
      aria-live='assertive'
      aria-atomic='true'
    >
      <div className={`toast-header text-white border-0 ${bgColor}`}>
        <strong className='me-auto'>{msg.title}</strong>
        <button
          type='button'
          className='btn-close btn-close-white'
          data-bs-dismiss='toast'
          aria-label='Close'
          onClick={handleShow}
          style={{ boxShadow: 'none' }}
        ></button>
      </div>
      <div className='toast-body'>{msg.msg}</div>
    </div>
  );
};

export default Toast;
