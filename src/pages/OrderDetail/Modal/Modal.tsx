import Xlogo from '../../../assets/images/X.svg';
import Polygon1 from '../../../assets/images/Polygon1.svg';

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
      className='absolute bottom-[110px] right-0 flex h-[49px] w-[300px] items-center justify-between rounded-xl bg-secondary pl-[3px] pr-3'
      aria-modal='true'
      role='dialog'
    >
      <div className='flex items-center justify-between'>
        <img
          className='relative left-[180px] top-[29px] -rotate-90'
          src={Polygon1}
          alt='세모'
        />
        <span className='text-base font-semibold text-primary'>{children}</span>
      </div>
      <button onClick={onClose}>
        <img src={Xlogo} alt='X' />
      </button>
    </div>
  );
};

export default Modal;
