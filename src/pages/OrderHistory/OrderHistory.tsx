import axios from 'axios';
import arrowRight from '../../assets/images/arrowRight_gray.svg';
import OrderList from '../../components/common/OrderList';
import '../../assets/css/customScroll.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingIcon from '../../components/common/loding/LodingIcon';
import LoadingMessage from '../../components/common/loding/LodingMessage';

type LunchItem = {
  id: number;
  name: string;
  details: string;
  price: number;
};

type OrderInfo = {
  name: string;
  phone: string;
  address: string;
  detailedAddress: string;
  deliveryMemo?: string;
  requestCheckbox?: boolean;
  cookingMemo?: string;
  totalPrice: number;
};

const OrderHistory = () => {
  // useParams을 써서 url에서 id 가져오기
  const { id } = useParams<{ id: string }>();

  // 가져온 도시락 정보 관리
  const [lunchItems, setLunchItems] = useState<LunchItem[]>([]);
  // 가져온 주문서 정보 관리
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  // 데이터 로딩 상태 관리
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrderData = async () => {
      try {
        const lunchResponses = await axios.get(
          `https://api.dosirock.store/v1/lunch/${id}`
        );
        const lunchData = lunchResponses.data;
        console.log('응답 데이터:', lunchData);
        if (Array.isArray(lunchData)) {
          setLunchItems(lunchData);
          setLoading(false);
        } else {
          console.error('올바르지 않은 응답 형식:', lunchData);
          setLoading(true);
        }

        const orderResponse = await axios.get(
          `https://api.dosirock.store/v1/orders/${id}`
        );
        const orderData: OrderInfo = orderResponse.data;
        console.log('응답 데이터:', orderData);
        if (orderData && typeof orderData === 'object') {
          setOrderInfo(orderData);
          setLoading(false);
        } else {
          console.error('올바르지 않은 응답 형식:', orderData);
          setLoading(true);
        }
      } catch (error) {
        console.error('정보를 가져오는 데 실패했습니다:', error);
      }
    };

    getOrderData();
    // url의 아이디 값이 바뀔 때 마다 작동
  }, [id]);

  return (
    <>
      {loading ? (
        <div className='flex w-[100%] flex-wrap items-center justify-center pt-[250px]'>
          <LoadingIcon />
          <LoadingMessage message={`주문 상세 정보를 불러오는 중입니다...`} />
        </div>
      ) : (
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
              {lunchItems.map((item) => (
                <OrderList
                  key={item.id}
                  name={item.name}
                  details={item.details}
                  price={item.price}
                />
              ))}
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
                      <div className='cursor-none font-light'>
                        {orderInfo?.name}
                      </div>
                    </div>
                    <div className='flex h-[47px] w-[320px] flex-wrap items-center'>
                      <div className='inline-block w-[95px] text-lg font-normal text-main'>
                        전화 번호
                      </div>
                      <p className='cursor-none font-light'>
                        {orderInfo?.phone}
                      </p>
                    </div>
                  </div>
                  <div className='flex h-[47px] w-[100%] flex-wrap items-center'>
                    <div className='inline-block w-[95px] text-lg font-normal text-main'>
                      배송지
                    </div>
                    <p className='cursor-none font-light'>
                      {orderInfo?.address}
                    </p>
                  </div>
                  <div className='flex h-[47px] w-[100%] flex-wrap items-center'>
                    <div className='w-[95px] text-lg font-normal text-main'>
                      상세 주소
                    </div>
                    <p className='cursor-none font-light'>
                      {orderInfo?.detailedAddress}
                    </p>
                  </div>
                  <div className='flex h-[100px] w-[100%] flex-wrap pt-3'>
                    <div className='w-[95px] text-lg font-normal text-main'>
                      배송 메모
                    </div>
                    <p className='cursor-none font-light'>
                      {orderInfo?.deliveryMemo || ''}
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
                        checked={orderInfo?.requestCheckbox || false}
                        readOnly
                      />
                      <span className='pl-2 text-base font-normal text-caption'>
                        일회용품도 함께 주세요
                      </span>
                    </div>
                  </div>
                  <div className='h-[115px] w-[100%] cursor-none rounded-xl border border-border px-[15px] py-[10px] font-light'>
                    {orderInfo?.cookingMemo || ''}
                  </div>
                  <div className='justify-end pt-[65px] text-right'>
                    <div>
                      <p className='text-lg font-normal text-main'>
                        총 결제금액
                      </p>
                      <p className='text-3xl font-normal text-main'>
                        {' '}
                        {orderInfo?.totalPrice.toLocaleString()}원
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default OrderHistory;
