const Toast = ({ msg, handleShow, bgColor }) => {
  return (
    <div
      className={`toast show position-fixed text-white ${bgColor}`}
      style={{ top: '5px', right: '5px', zIndex: 9, minWidth: '280px' }}
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
        ></button>
      </div>
      <div className='toast-body'>{msg.msg}</div>
    </div>
  );
};

export default Toast;
