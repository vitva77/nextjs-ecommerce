import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <svg width='210' height='250' viewBox='0 0 40 50'>
        <polygon
          strokeWidth='1'
          stroke='#000'
          fill='none'
          points='20,1 40,40 1,40'
        ></polygon>
        <text fill='#000' x='5' y='47'>
          Loading
        </text>
      </svg>
    </div>
  );
};

export default Loading;
