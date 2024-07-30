import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CancelOrderModal from './Modal/CancelOrderModal';

type Props = {
  id: number;
  status: number;
  amount: number;
  date: string;
  totalPrice: number;
};

const OrderItem: React.FC<Props> = ({
  id,
  status,
  amount,
  date,
  totalPrice,
}) => {
  // 주문취소 모달
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);

  // 금액 포맷 함수 (콤마 표시)
  const formatAmount = () => {
    const formattedAmount = totalPrice.toLocaleString();
    return formattedAmount;
  };

  // 날짜 포맷 함수
  const formatDate = () => {
    const dateObj = new Date(date); // 문자열을 Date 객체로 변환
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  };

  return (
    <li className='mb-[12px] flex h-[70px] items-center rounded-lg border border-border text-center text-[17px]'>
      <span className='w-1/6'>{status == 1 ? '주문완료' : '주문취소'}</span>
      <span className='w-1/6'>
        {amount === 1 ? '도시락 1' : `도시락 1 외 ${amount - 1}개`}
      </span>
      <span className='w-1/6'>{formatDate()}</span>
      <span className='w-1/6'>{formatAmount()}원</span>
      <span className='w-1/6 hover:text-primary'>
        <Link to={`/orderhistories/${id}`}>주문상세</Link>
      </span>
      <div className='w-1/6'>
        <button
          className='w-[100px] rounded-[5px] bg-gray30 leading-[35px] text-white hover:bg-caption'
          onClick={() => setIsCancelModalOpen(!isCancelModalOpen)}
        >
          주문취소
        </button>
      </div>
      {isCancelModalOpen && (
        <CancelOrderModal setIsCancelModalOpen={setIsCancelModalOpen} id={id} />
      )}
    </li>
  );
};

export default OrderItem;
