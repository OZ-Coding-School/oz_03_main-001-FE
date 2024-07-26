import { useForm } from 'react-hook-form';
import axios from 'axios';
import arrowRight from '../../assets/images/arrowRight_gray.svg';
import OrderList from './OrderList';
import '../../assets/css/customScroll.css';
import { useEffect, useState } from 'react';
import LoadingIcon from '../../components/common/loding/LodingIcon';
import LoadingMessage from '../../components/common/loding/LodingMessage';
import { useNavigate } from 'react-router-dom';

// 도시락 데이터 타입 정의
type MenuItem = {
  id: number;
  name: string; // 도시락 이름
  details: string; // 밥, 국 반찬
  price: number; // 가격
};

// 폼 데이터 타입 정의
type FormData = {
  name: string;
  phone: string;
  address: string;
  detailedAddress: string;
  deliveryMemo?: string;
  requestCheckbox?: boolean;
  cookingMemo?: string;
};

const OrderDetail = () => {
  const navigate = useNavigate();

  // 가져온 도시락 정보 관리
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  // 도시락의 가격 관리
  const [allPrice, setAllPrice] = useState<number>(0);

  useEffect(() => {
    const getMenuItems = async () => {
      try {
        const response = await axios.get('/api/v1/lunch');
        const items = response.data;
        console.log('응답 데이터:', items);

        if (Array.isArray(items)) {
          setMenuItems(items);

          const totalPrice = items.reduce(
            (sum: number, item: MenuItem) => sum + item.price,
            0
          );
          setAllPrice(totalPrice);
        } else {
          console.error('올바르지 않은 응답 형식:', items);
        }
      } catch (error) {
        console.error('도시락 리스트를 가져오는 데 실패했습니다:', error);
      }
    };

    getMenuItems();
  }, []);

  const { register, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      detailedAddress: '',
      deliveryMemo: '',
      requestCheckbox: false,
      cookingMemo: '',
    },
  });

  // 폼제출 여부 상태 관리
  const [submitted, setSubmitted] = useState(false);

  // watch를 이용해 각 필드의 상태를 감시
  const name = watch('name');
  const phone = watch('phone');
  const address = watch('address');
  const detailedAddress = watch('detailedAddress');

  // 모든 필드가 채워져 있으면 트루
  const isFormEmpty = name && phone && address && detailedAddress;

  // 필드 값과 폼 제출 여부를 받아 클래스 값 변경
  const getBorderClass = (fieldValue: string) => {
    if (submitted && !fieldValue) {
      return 'border-primary';
    }
    return 'border-border';
  };

  const onSubmit = async (data: FormData) => {
    setSubmitted(true); // 제출 시 상태 변경

    try {
      if (!isFormEmpty) {
        return false;
      }
      await axios.post('/api/submit-order', data);
      navigate('/orderhistories');
    } catch (error) {
      console.log('주문서 데이터:', data); // 폼 데이터 콘솔에 출력
      // console.error('주문 제출 실패:', error);
      // alert('주문 제출에 실패했습니다.');
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
          {menuItems.length === 0 ? (
            <div className='flex w-[100%] flex-wrap items-center justify-center pt-[250px]'>
              <LoadingIcon />
              <LoadingMessage message={`도시락 정보를 불러오는 중입니다...`} />
            </div>
          ) : (
            menuItems.map((item) => (
              <OrderList
                key={item.id}
                name={item.name}
                details={item.details}
                price={item.price}
              />
            ))
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
                    className={`h-[47px] cursor-none rounded-xl border ${getBorderClass(phone)} px-[15px] py-[10px]`}
                    style={{ width: 'calc(100% - 95px)' }}
                    {...register('phone')}
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
                  id='detailedAddress'
                  type='text'
                  placeholder='상세 주소를 입력해 주세요.'
                  className={`h-[47px] cursor-none rounded-xl border ${getBorderClass(detailedAddress)} px-[15px] py-[10px]`}
                  style={{ width: 'calc(100% - 95px)' }}
                  {...register('detailedAddress')}
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
                  {...register('deliveryMemo')}
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
                    id='requestCheckbox'
                    type='checkbox'
                    // eslint-disable-next-line tailwindcss/classnames-order
                    className='h-5 w-5 cursor-none appearance-none rounded-[4px] bg-checkBox bg-contain bg-center bg-no-repeat checked:bg-checkBox_check checked:bg-contain checked:bg-center checked:bg-no-repeat'
                    {...register('requestCheckbox')}
                  />
                  <label
                    htmlFor='requestCheckbox'
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
                {...register('cookingMemo')}
              />
              <div className='flex items-center justify-between pt-[65px]'>
                <div>
                  <p className='text-lg font-normal text-main'>총 결제금액</p>
                  <p className='text-3xl font-normal text-main'>
                    {allPrice.toString()}원
                  </p>
                </div>
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
        </form>
      </section>
    </div>
  );
};

export default OrderDetail;
