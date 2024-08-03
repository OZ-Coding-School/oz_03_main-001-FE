/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CancelOrderModal from './Modal/CancelOrderModal';

type Props = {
  id: number;
  status: OrderStatusEnum;
  amount: string[];
  date: string;
  totalPrice: number;
};

enum OrderStatusEnum {
  COMPLETE = 1,
  CANCEL = -1,
}

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

  // 주문취소 내역 처리
  const getStatusText = () => {
    return status === OrderStatusEnum.COMPLETE ? '주문완료' : '주문취소';
  };

  const handleCancleOrder = () => {
    if (status === OrderStatusEnum.COMPLETE) {
      setIsCancelModalOpen(!isCancelModalOpen);
    }
  };

  // amount 배열 처리
  const formatAmountText = () => {
    if (amount.length === 0) {
      return '정보 없음'; // 배열이 비어있는 경우
    }

    const [first, ...rest] = amount;
    return rest.length > 0 ? `${first} 외 ${rest.length}개` : first;
  };

  const listItemClass = `mb-[12px] flex h-[70px] items-center rounded-lg border border-border text-center text-[17px] ${status === OrderStatusEnum.CANCEL ? 'bg-background' : ''}`;
  const buttonClass = `w-[100px] rounded-[5px] bg-caption leading-[35px] text-white hover:bg-dark ${status === OrderStatusEnum.CANCEL ? '!bg-gray30' : ''}`;
  const textClass = ` w-1/6 ${status === OrderStatusEnum.CANCEL ? 'text-gray30' : ''}`;

  return (
    <li className={listItemClass}>
      <span className={textClass}>{getStatusText()}</span>
      <span className={textClass}>{formatAmountText()}</span>
      <span className={textClass}>{formatDate()}</span>
      <span className={textClass}>{formatAmount()}원</span>
      <span className={`hover:text-primary ${textClass}`}>
        <Link to={`/orderhistories/${id}`}>주문상세</Link>
      </span>
      <div className={textClass}>
        <button className={buttonClass} onClick={() => handleCancleOrder()}>
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
