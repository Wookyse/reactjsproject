import './styles.css';

export const Button = ({ text, onClick, disabled }) => (
  <button
    className='butt'
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);