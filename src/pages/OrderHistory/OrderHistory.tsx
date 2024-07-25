// import axios from 'axios';
import arrowRight from '../../assets/images/arrowRight_gray.svg';
import OrderList from '../OrderDetail/OrderList';
import '../../assets/css/customScroll.css';
// import { useEffect, useState } from 'react';
// import LoadingIcon from '../../components/common/loding/LodingIcon';
// import LoadingMessage from '../../components/common/loding/LodingMessage';

const OrderHistory = () => {
  return (
    <div
      className='flex w-screen flex-nowrap justify-between px-[73px] pb-[47px] pt-[13px]'
      style={{ height: 'calc(100vh - 75px)' }}
    >
      <section className='w-[49%]'>
        <nav className='flex flex-nowrap items-center'>
          <span className='text-sm font-bold text-main'>주문하기</span>
          <img className='px-[11px]' src={arrowRight} alt='arrow right' />
          <span className='text-sm font-normal text-caption'>주문완료</span>
        </nav>
        <div className='pb-[25px] pt-[20px] text-[22px] font-semibold text-main'>
          선택한 도시락
        </div>
        <div
          className='customScroll flex flex-col gap-3 overflow-y-auto pr-[3px]'
          style={{ height: 'calc(100% - 98px)' }}
        >
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
        </div>
      </section>
      <section className='w-[49%]'>
        <div className='h-[100%]'>
          <div className='pb-[25px] pt-[40px] text-[22px] font-semibold text-main'>
            배송정보 입력
          </div>
          <div
            className='customScroll flex flex-col justify-between overflow-y-auto pr-[3px]'
            style={{ height: 'calc(100% - 98px)' }}
          >
            <div className='flex max-h-max flex-col gap-4 rounded-lg border border-border px-[40px] py-[35px]'>
              <div className='flex w-[100%] flex-wrap justify-between gap-4'>
                <div className='flex h-[47px] w-[250px] flex-wrap items-center'>
                  <div className='inline-block w-[95px] text-lg font-normal text-main'>
                    이름
                  </div>
                  <div className='cursor-none font-light'>이현주</div>
                </div>
                <div className='flex h-[47px] w-[320px] flex-wrap items-center'>
                  <div className='inline-block w-[95px] text-lg font-normal text-main'>
                    전화 번호
                  </div>
                  <p className='cursor-none font-light'>01012345678</p>
                </div>
              </div>
              <div className='flex h-[47px] w-[100%] flex-wrap items-center'>
                <div className='inline-block w-[95px] text-lg font-normal text-main'>
                  배송지
                </div>
                <p className='cursor-none font-light'>사랑시 고백구 행복동</p>
              </div>
              <div className='flex h-[47px] w-[100%] flex-wrap items-center'>
                <div className='w-[95px] text-lg font-normal text-main'>
                  상세 주소
                </div>
                <p className='cursor-none font-light'>12-34</p>
              </div>
              <div className='flex h-[100px] w-[100%] flex-wrap pt-3'>
                <div className='w-[95px] text-lg font-normal text-main'>
                  배송 메모
                </div>
                <p className='cursor-none font-light'>
                  로비 비번 : 1111, 문 앞에 두고 노크해주세요!
                </p>
              </div>
            </div>
            <div>
              <div className='flex items-center justify-between pb-3 pt-3'>
                <div className='text-[22px] font-semibold text-main'>
                  요청사항
                </div>
                <div className='flex items-center justify-center'>
                  <input
                    id='requestCheckbox'
                    type='checkbox'
                    // eslint-disable-next-line tailwindcss/classnames-order
                    className='h-5 w-5 cursor-none appearance-none rounded-[4px] bg-checkBox bg-contain bg-center bg-no-repeat checked:bg-checkBox_check checked:bg-contain checked:bg-center checked:bg-no-repeat'
                  />
                  <span className='pl-2 text-base font-normal text-caption'>
                    일회용품도 함께 주세요
                  </span>
                </div>
              </div>
              <div className='h-[115px] w-[100%] cursor-none rounded-xl border border-border px-[15px] py-[10px] font-light'>
                맛있게 만들어 주세요
              </div>
              <div className='justify-end pt-[65px] text-right'>
                <div>
                  <p className='text-lg font-normal text-main'>총 결제금액</p>
                  <p className='text-3xl font-normal text-main'>{0}원</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderHistory;
