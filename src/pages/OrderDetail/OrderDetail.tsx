/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import axios from 'axios';
import arrowRight from '../../assets/images/arrowRight_gray.svg';
import OrderList from '../../components/common/OrderList';
import '../../assets/css/customScroll.css';
import { useEffect, useState } from 'react';
import LoadingIcon from '../../components/common/loding/LodingIcon';
import LoadingMessage from '../../components/common/loding/LodingMessage';
import { useNavigate } from 'react-router-dom';
import useOrderStore from '../../store/useOrderStore';
import payLogo3D from '../../assets/images/공지형_메일배너활용_3D.png';
import { toast } from 'react-toastify';

// 폼 데이터 타입 정의
type FormData = {
  name: string;
  contact_number: string;
  address: string;
  detail_address: string;
  delivery_memo?: string;
  is_disposable?: boolean;
  cooking_memo?: string;
  total_price: number;
};

// IMP 객체 타입 선언
interface IMP {
  init: (accountId: string) => void;
  request_pay: (data: any, callback: (response: any) => void) => void;
}

// 전역 객체에 IMP 추가
declare global {
  interface Window {
    IMP?: IMP;
  }
}

const OrderDetail = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.iamport.kr/v1/iamport.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const navigate = useNavigate();

  // zustand store에서 상태 및 액션 가져오기
  const { basket, totalPrice } = useOrderStore((state) => ({
    basket: state.basket,
    totalPrice: state.totalPrice,
  }));

  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      name: '',
      contact_number: '',
      address: '',
      detail_address: '',
      delivery_memo: '',
      is_disposable: false,
      cooking_memo: '',
      total_price: 0,
    },
  });

  // watch를 이용해 각 필드의 상태를 감시
  const name = watch('name');
  const contact_number = watch('contact_number');
  const address = watch('address');
  const detail_address = watch('detail_address');

  // 모든 필드가 채워져 있으면 트루
  const isFormEmpty = name && contact_number && address && detail_address;

  const handlePhoneInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;
    const filteredInput = input.replace(/[^\d]/g, ''); // 숫자 이외의 문자를 모두 제거
    setValue('contact_number', filteredInput); // setValue를 사용하여 폼 값 업데이트
  };

  // 폼제출 여부 상태 관리
  const [submitted, setSubmitted] = useState(false);

  // 필드 값과 폼 제출 여부를 받아 클래스 값 변경
  const getBorderClass = (fieldValue: string) => {
    if (submitted && !fieldValue) {
      return 'border-primary';
    }
    return 'border-border';
  };

  // 현재 날짜를 YYYY.MM.DD 형식으로 계산
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
    const day = String(now.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  };
  const currentDate = getCurrentDate();

  // 카테고리 정렬 기준
  const CATEGORY_ORDER = ['bob', 'guk', 'chan', 'side'];

  const onSubmit = async (data: FormData) => {
    setSubmitted(true); // 제출 시 상태 변경

    // 필수 입력 필드와 도시락 구성이 비어 있는지 확인
    if (!isFormEmpty && totalPrice === 0) {
      toast.error('도시락 구성과 배송정보를 확인해 주세요!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { width: '380px', background: '#FFF4B8', color: 'black' },
      });
      return;
    } else if (!isFormEmpty) {
      toast.error('배송 정보를 입력해 주세요!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { background: '#FFF4B8', color: 'black' },
      });
      return;
    } else if (totalPrice === 0) {
      toast.error('도시락 구성을 채워 주세요!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { background: '#FFF4B8', color: 'black' },
      });
      return;
    }

    // 세션 스토리지에서 user 정보 가져오기
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');

    // `boxPrice`가 0이 아닌 박스만 필터링
    const filteredBasket = basket.filter((box) => box.boxPrice > 0);

    // 필터링된 데이터를 서버 형식에 맞게 가공
    const formDataWithDate = {
      ...data,
      user: user,
      created_at: currentDate,
      total_price: totalPrice,
      items: filteredBasket.map((box) => ({
        quantity: box.quantity,
        lunch: {
          id: box.id,
          name: box.name,
          description: box.name,
          total_price: box.boxPrice,
          lunch_menus: box.pickedDishList
            .slice()
            .sort(
              (a, b) =>
                CATEGORY_ORDER.indexOf(a.dish.category) -
                CATEGORY_ORDER.indexOf(b.dish.category)
            )
            .map((pickedDish) => ({
              id: pickedDish.dish.id,
              quantity: 1,
              name: pickedDish.dish.name,
              price: pickedDish.dish.price,
            })),
        },
      })),
    };

    // 아임포트 결제 요청
    const { IMP } = window;
    if (IMP) {
      IMP.init('imp61621567'); // 아임포트 관리자 페이지에서 확인한 가맹점 식별코드

      const paymentData = {
        pg: 'kakaopay.TC0ONETIME',
        pay_method: 'card',
        merchant_uid: `mid_${new Date().getTime()}`, // 주문 번호
        amount: totalPrice, // 결제 금액
        name: '도시락 주문 결제',
      };

      IMP.request_pay(paymentData, async (response: any) => {
        const { success, error_msg } = response;

        if (success) {
          try {
            // 결제 성공 시 서버에 주문 데이터 전송
            await axios.post('https://api.dosirock.store/v1/orders', {
              ...formDataWithDate,
            });
            navigate('/orderhistories');
          } catch (error) {
            console.error('주문서 데이터:', formDataWithDate);

            toast.error('서버 문제로 잠시 후 다시 시도해 주세요!', {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              style: { width: '330px', background: '#FFF4B8', color: 'black' },
            });
          }
        } else {
          toast.error(error_msg, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: { width: '350px', background: '#FFF4B8', color: 'black' },
          });
        }
      });
    }
  };

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
          className='customScroll flex flex-col items-center gap-3 overflow-y-auto pr-[3px]'
          style={{ height: 'calc(100% - 98px)' }}
        >
          {basket.length === 0 ? (
            <div className='flex w-[100%] flex-wrap items-center justify-center pt-[250px]'>
              <LoadingIcon />
              <LoadingMessage message={`장바구니에 도시락이 없어요!`} />
            </div>
          ) : (
            (() => {
              // `boxPrice`가 0이 아닌 박스가 있는지 확인
              const noZeroPriceBox = basket.some((box) => box.boxPrice > 0);

              if (noZeroPriceBox) {
                return basket
                  .filter((box) => box.boxPrice > 0) // `boxPrice`가 0이 아닌 박스만 필터링
                  .map((box) => {
                    // dish의 category를 기준으로 정렬
                    const sortedPickedDishList = box.pickedDishList
                      .slice() // 원본 배열을 변경하지 않기 위해 복사
                      .sort(
                        (a, b) =>
                          CATEGORY_ORDER.indexOf(a.dish.category) -
                          CATEGORY_ORDER.indexOf(b.dish.category)
                      );

                    // 정렬된 dish 리스트로 details 생성
                    const details = sortedPickedDishList
                      .map((pickedDish) => pickedDish.dish.name)
                      .join(', ');

                    return details ? (
                      <OrderList
                        key={box.id}
                        name={`${box.name} \u2009 \u2009 X ${box.quantity}`}
                        details={details}
                        price={box.boxPrice}
                      />
                    ) : null; // `details`가 비어있으면 렌더링하지 않음
                  });
              } else {
                return (
                  <div className='flex w-[100%] flex-wrap items-center justify-center pt-[250px]'>
                    <LoadingIcon />
                    <LoadingMessage message={`도시락 구성이 비어있어요!`} />
                  </div>
                );
              }
            })()
          )}
        </div>
      </section>
      <section className='w-[49%]'>
        <form onSubmit={handleSubmit(onSubmit)} className='h-[100%]'>
          <div className='pb-[25px] pt-[40px] text-[22px] font-semibold text-main'>
            배송정보 입력
          </div>
          <div
            className='customScroll flex flex-col justify-between overflow-y-auto pr-[3px]'
            style={{ height: 'calc(100% - 98px)' }}
          >
            <div className='flex flex-col gap-4 rounded-lg border border-border px-[40px] py-[35px]'>
              <div className='flex w-[100%] flex-wrap justify-between gap-4'>
                <div className='flex w-[250px] flex-wrap items-center'>
                  <div className='relative inline-block w-[95px] text-lg font-normal text-main'>
                    이름
                    <div className='absolute left-[-10px] top-[-7px] h-1 w-1 text-primary'>
                      *
                    </div>
                  </div>
                  <input
                    id='name'
                    type='text'
                    className={`h-[47px] cursor-none rounded-xl border ${getBorderClass(name)} px-[15px] py-[10px]`}
                    style={{ width: 'calc(100% - 95px)' }}
                    {...register('name')}
                  />
                </div>
                <div className='flex w-[320px] flex-wrap items-center'>
                  <div className='relative inline-block w-[95px] text-lg font-normal text-main'>
                    전화 번호
                    <div className='absolute left-[-10px] top-[-7px] h-1 w-1 text-primary'>
                      *
                    </div>
                  </div>
                  <input
                    id='phone'
                    type='text'
                    placeholder='숫자를 입력해 주세요.'
                    className={`h-[47px] cursor-none rounded-xl border ${getBorderClass(contact_number)} px-[15px] py-[10px]`}
                    style={{ width: 'calc(100% - 95px)' }}
                    {...register('contact_number')}
                    onChange={handlePhoneInputChange}
                  />
                </div>
              </div>
              <div className='w-[100%]'>
                <div className='relative inline-block w-[95px] text-lg font-normal text-main'>
                  배송지
                  <div className='absolute left-[-10px] top-[-7px] h-1 w-1 text-primary'>
                    *
                  </div>
                </div>
                <input
                  id='address'
                  type='text'
                  placeholder='도로명 주소 또는 지번 주소를 입력해주세요.'
                  className={`h-[47px] cursor-none rounded-xl border ${getBorderClass(address)} px-[15px] py-[10px]`}
                  style={{ width: 'calc(100% - 95px)' }}
                  {...register('address')}
                />
              </div>
              <div className='w-[100%]'>
                <div className='relative inline-block w-[95px] text-lg font-normal text-main'>
                  상세 주소
                  <div className='absolute left-[-10px] top-[-7px] h-1 w-1 text-primary'>
                    *
                  </div>
                </div>
                <input
                  id='detail_address'
                  type='text'
                  placeholder='상세 주소를 입력해 주세요.'
                  className={`h-[47px] cursor-none rounded-xl border ${getBorderClass(detail_address)} px-[15px] py-[10px]`}
                  style={{ width: 'calc(100% - 95px)' }}
                  {...register('detail_address')}
                />
              </div>
              <div className='w-[100%]'>
                <div className='float-left inline-block w-[95px] text-lg font-normal text-main'>
                  배송 메모
                </div>
                <textarea
                  id='deliveryMemo'
                  placeholder='기사님께 전달해드릴 배송 메모를 입력해 주세요.'
                  className='h-[100px] cursor-none rounded-xl border border-border px-[15px] py-[10px] align-top'
                  style={{ width: 'calc(100% - 95px)', resize: 'none' }}
                  {...register('delivery_memo')}
                />
              </div>
            </div>
            <div>
              <div className='flex items-center justify-between pb-3 pt-3'>
                <div className='text-[22px] font-semibold text-main'>
                  요청사항
                </div>
                <div className='flex items-center justify-center'>
                  <input
                    id='is_disposable'
                    type='checkbox'
                    // eslint-disable-next-line tailwindcss/classnames-order
                    className='h-5 w-5 cursor-none appearance-none rounded-[4px] bg-checkBox bg-contain bg-center bg-no-repeat checked:bg-checkBox_check checked:bg-contain checked:bg-center checked:bg-no-repeat'
                    {...register('is_disposable')}
                  />
                  <label
                    htmlFor='is_disposable'
                    className='pl-2 text-base font-normal text-caption'
                  >
                    일회용품도 함께 주세요
                  </label>
                </div>
              </div>
              <textarea
                id='cookingMemo'
                placeholder='도시락 주문시 요청 사항을 입력해 주세요.'
                className='h-[115px] w-[100%] cursor-none rounded-xl border border-border px-[15px] py-[10px]'
                style={{ resize: 'none' }}
                {...register('cooking_memo')}
              />
              <div className='flex items-center justify-between pt-[65px]'>
                <div>
                  <p className='text-lg font-normal text-main'>총 결제금액</p>
                  <p className='text-3xl font-normal text-main'>
                    {totalPrice.toLocaleString()}원
                  </p>
                </div>
                <div className='relative'>
                  <img
                    src={payLogo3D}
                    alt='payLogo'
                    className={`${
                      isFormEmpty ? 'contrast-100' : 'contrast-75'
                    } w-[100px]'absolute absolute -left-10 bottom-[0px] w-[100px]`}
                  />
                  <button
                    type='submit'
                    className={`${
                      isFormEmpty
                        ? 'bg-primary hover:bg-primary-hover'
                        : 'bg-disabled'
                    } h-20 w-[200px] rounded-xl text-center text-xl font-medium text-white`}
                  >
                    주문하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default OrderDetail;
