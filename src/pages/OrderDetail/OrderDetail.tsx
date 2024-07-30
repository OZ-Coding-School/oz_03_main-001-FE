import { useForm } from 'react-hook-form';
import axios from 'axios';
import arrowRight from '../../assets/images/arrowRight_gray.svg';
import OrderList from '../../components/common/OrderList';
import '../../assets/css/customScroll.css';
import { useEffect, useState } from 'react';
import LoadingIcon from '../../components/common/loding/LodingIcon';
import LoadingMessage from '../../components/common/loding/LodingMessage';
import { useNavigate } from 'react-router-dom';

// API 응답 타입 정의
type ApiResponse = {
  results: LunchSet[];
};

// 도시락 세트 타입 정의
type LunchSet = {
  name: string;
  description: string;
  total_price: number;
  total_kcal: number;
  image_url: string;
  menus: {
    quantity: number;
    menu: {
      id: number;
      name: string;
      category: string;
    };
  }[];
};

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

const OrderDetail = () => {
  const navigate = useNavigate();

  // 가져온 도시락 정보 관리
  const [menuItems, setMenuItems] = useState<LunchSet[]>([]);
  // 총 가격 관리
  const [totalPrice, setTotalPrice] = useState(0);

  // 페이지가 렌더링 되었을 때 도시락 정보 가져오기
  useEffect(() => {
    const getMenuItems = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          'http://api.dosirock.store/v1/lunch'
        );
        const dosirockItems: LunchSet[] = response.data.results;
        console.log('응답 데이터:', dosirockItems);

        if (Array.isArray(dosirockItems)) {
          setMenuItems(dosirockItems);

          const totalPrice = dosirockItems.reduce(
            (acc, item) => acc + item.total_price,
            0
          );
          setTotalPrice(totalPrice);
        } else {
          console.error('올바르지 않은 응답 형식:', dosirockItems);
        }
      } catch (error) {
        console.error('도시락 리스트를 가져오는 데 실패했습니다:', error);
      }
    };

    getMenuItems();
  }, [menuItems]);

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

  const onSubmit = async (data: FormData) => {
    setSubmitted(true); // 제출 시 상태 변경

    // 폼 데이터를 서버 형식에 맞게 가공
    const formDataWithDate = {
      ...data,
      created_at: currentDate,
      total_price: totalPrice,
      items: menuItems.map((item) => ({
        quantity: 1,
        lunch: {
          name: item.name,
          description: item.name,
          menus: item.menus.map((menuItem) => ({
            id: menuItem.menu.id,
            quantity: 1,
          })),
        },
      })),
    };
    try {
      if (!isFormEmpty) {
        return false;
      }

      await axios.post('http://api.dosirock.store/v1/orders', formDataWithDate);
      navigate('/orderhistories');
    } catch (error) {
      console.log('주문서 데이터:', formDataWithDate);
      alert('주문서 제출에 실패했습니다.');
    }
  };

  const handlePhoneInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;
    const filteredInput = input.replace(/[^\d]/g, ''); // 숫자 이외의 문자를 모두 제거
    setValue('contact_number', filteredInput); // setValue를 사용하여 폼 값 업데이트
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
                key={item.name}
                name={item.name}
                details={item.menus
                  .map((menuItem) => menuItem.menu.name)
                  .join(', ')}
                price={item.total_price}
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
                    {totalPrice.toString()}원
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
