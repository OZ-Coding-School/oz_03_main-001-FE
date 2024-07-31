/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useRef, useEffect } from 'react';
import axios from 'axios';

type CancelOrderModalProps = {
  setIsCancelModalOpen: (value: boolean) => void;
  id: number;
};

const CancelOrderModal: React.FC<CancelOrderModalProps> = ({
  setIsCancelModalOpen,
  id,
}) => {
  // 주문취소 창 이외의 영역을 누르면 주문취소 모달이 사라지게
  const modalRef = useRef<HTMLDivElement | null>(null);
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Node;
    if (modalRef.current && !modalRef.current.contains(target)) {
      setIsCancelModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 주문취소
  const cancelOrder = async (id: number) => {
    try {
      const response = await axios.put(
        `https://api.dosirock.store/v1/orders/${id}`,
        {
          status: -1,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('주문취소에 성공했습니다. : ', response);
    } catch (error) {
      console.log('주문취소에 실패했습니다. : ', error);
    }
  };

  return (
    <div
      ref={modalRef}
      className='fixed left-1/2 top-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-[20px] bg-white p-[50px] text-center shadow-btn'
    >
      <p className='mb-[50px] text-[18px] font-medium'>
        주문을 취소하시겠습니까?
      </p>
      <button
        onClick={() => {
          setIsCancelModalOpen(false);
          cancelOrder(id);
        }}
        className='mr-[20px] w-[140px] rounded-md bg-tigim p-3 text-white hover:bg-[#EFA942]'
      >
        네, 취소할게요
      </button>
      <button
        onClick={() => {
          setIsCancelModalOpen(false);
        }}
        className='w-[140px] rounded-md bg-border p-3 hover:bg-gray20'
      >
        아니요
      </button>
    </div>
  );
};

export default CancelOrderModal;
