import React from 'react';
import OrderItem from './OrderItem';
import '../../assets/css/customScroll.css';

const OrderHistories = () => {
  return (
    <div>
      <div className='inner mx-auto w-[1775px]'>
        <h2 className='mb-[40px] mt-[50px] text-[22px] font-semibold'>
          도시락 주문 내역
        </h2>
        <div>
          <ul className='flex h-[60px] items-center pr-[10px] text-center'>
            <li className='w-1/6 text-[18px] text-caption'>주문상태</li>
            <li className='w-1/6 text-[18px] text-caption'>주문내용</li>
            <li className='w-1/6 text-[18px] text-caption'>결제일</li>
            <li className='w-1/6 text-[18px] text-caption'>금액</li>
            <li className='w-1/6 text-[18px] text-caption'>주문상세</li>
            <li className='w-1/6 text-[18px] text-caption'>주문취소</li>
          </ul>
          <div className='customScroll h-custom-calc1 overflow-y-scroll'>
            <ul>
              <OrderItem />
              <OrderItem />
              <OrderItem />
              <OrderItem />
              <OrderItem />
              <OrderItem />
              <OrderItem />
              <OrderItem />
              <OrderItem />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistories;
