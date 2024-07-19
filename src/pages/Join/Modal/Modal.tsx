import Xlogo from '../../../assets/images/X.svg';
import Polygon1 from '../../../assets/images/Polygon 1.svg';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

// eslint-disable-next-line react/prop-types
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`absolute left-[310px] top-[5.5px] flex h-[49px] w-[300px] items-center justify-between rounded-xl bg-secondary pl-[3px] pr-3`}
    >
      <div className='flex items-center justify-between'>
        <img className='relative right-[13px]' src={Polygon1} alt='세모' />
        <span className='text-base font-semibold text-primary'>{children}</span>
      </div>
      <button onClick={onClose}>
        <img src={Xlogo} alt='X' />
      </button>
    </div>
  );
};

export default Modal;
