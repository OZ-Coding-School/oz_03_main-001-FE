import React from 'react';

const OrderItem = () => {
  return (
    <li className='mb-[12px] flex h-[70px] items-center rounded-lg border border-border text-center text-[17px]'>
      <span className='w-1/6'>주문완료</span>
      <span className='w-1/6'>도시락 1 외 4개</span>
      <span className='w-1/6'>2025.07.24</span>
      <span className='w-1/6'>39,900 원</span>
      <span className='w-1/6'>주문상세</span>
      <div className='w-1/6'>
        <button className='w-[100px] rounded-[5px] bg-caption leading-[35px] text-white'>
          주문취소
        </button>
      </div>
    </li>
  );
};

export default OrderItem;
