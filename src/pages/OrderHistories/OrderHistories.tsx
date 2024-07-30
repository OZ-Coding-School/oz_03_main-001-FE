import { useEffect, useState } from 'react';
import axios from 'axios';
import OrderItem from './OrderItem';
import '../../assets/css/customScroll.css';
import noOrder from '../../assets/images/noorder.png';

interface LunchMenu {
  id: number;
  quantity: number;
  name: string;
  kcal: number;
}

interface Lunch {
  id: number;
  name: string;
  description: string;
  total_price: number;
  lunch_menu: LunchMenu[];
}

interface Item {
  lunch: Lunch;
  quantity: number;
}

interface Order {
  id: number;
  user: number;
  request_things: string;
  name: string;
  status: number;
  address: string;
  contact_number: string;
  is_disposable: boolean;
  total_price: number;
  created_at: string;
  items: Item[];
}

// interface ApiResponse {
//   total_count: number;
//   total_pages: number;
//   current_page: number;
//   results: Order[];
// }

const OrderHistories = () => {
  // 주문내역 안보여줄때
  const [hasOrders, setHasOrders] = useState<boolean>(false);
  const [noOrderMessage, setNoOrderMessage] = useState<string>(
    '도시락 주문내역을 가져오는 데 실패했습니다.'
  );
  // 주문내역
  const [orderLists, setOrderLists] = useState<Order[]>([]);

  useEffect(() => {
    const getOrderHistories = async () => {
      try {
        const response = await axios.get(
          'https://api.dosirock.store/v1/orders/'
        );
        console.log('응답 데이터 :', response.data);

        if (Array.isArray(response.data.results)) {
          if (response.data.results.length !== 0) {
            // 주문내역이 있을때
            setHasOrders(true);
            setOrderLists(response.data.results);
          } else {
            // 주문내역이 없을때
            setHasOrders(false);
            setNoOrderMessage('주문 내역이 없습니다.');
          }
        } else {
          console.error('올바르지 않은 응답 형식');
          setHasOrders(false);
        }
      } catch (error) {
        console.log('도시락 주문내역을 가져오는 데 실패했습니다:', error);
        setHasOrders(false);
        setNoOrderMessage('도시락 주문내역을 가져오는 데 실패했습니다.');
      }
    };

    getOrderHistories();
  }, []);

  // const dummyOrderLists: ApiResponse = {
  //   total_count: 3,
  //   total_pages: 1,
  //   current_page: 1,
  //   results: [
  //     {
  //       id: 1,
  //       user: 1,
  //       request_things: '특별 요청사항',
  //       name: '김철수',
  //       status: 1,
  //       address: '서울시 강남구',
  //       contact_number: '010-1234-5678',
  //       is_disposable: false,
  //       total_price: 17000,
  //       created_at: '2024-07-25T14:35:04.020057+09:00',
  //       items: [
  //         {
  //           lunch: {
  //             id: 3,
  //             name: '도시락1',
  //             description: '신선한 도시락',
  //             total_price: 10000,
  //             lunch_menu: [
  //               { id: 5, quantity: 1, name: 'menu1', kcal: 333 },
  //               { id: 6, quantity: 2, name: 'menu2', kcal: 333 },
  //             ],
  //           },
  //           quantity: 1,
  //         },
  //         {
  //           lunch: {
  //             id: 4,
  //             name: '도시락2',
  //             description: '신선한 도시락2',
  //             total_price: 7000,
  //             lunch_menu: [
  //               { id: 7, quantity: 1, name: 'menu3', kcal: 333 },
  //               { id: 8, quantity: 1, name: 'menu4', kcal: 333 },
  //             ],
  //           },
  //           quantity: 2,
  //         },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       user: 1,
  //       request_things: '특별 요청사항',
  //       name: '김철수',
  //       status: 1,
  //       address: '서울시 강남구',
  //       contact_number: '010-1234-5678',
  //       is_disposable: false,
  //       total_price: 27000,
  //       created_at: '2024-07-27T14:35:04.020057+09:00',
  //       items: [
  //         {
  //           lunch: {
  //             id: 1,
  //             name: '도시락1',
  //             description: '신선한 도시락',
  //             total_price: 10000,
  //             lunch_menu: [
  //               { id: 1, quantity: 1, name: 'menu1', kcal: 333 },
  //               { id: 2, quantity: 2, name: 'menu2', kcal: 333 },
  //             ],
  //           },
  //           quantity: 1,
  //         },
  //         {
  //           lunch: {
  //             id: 2,
  //             name: '도시락2',
  //             description: '신선한 도시락2',
  //             total_price: 7000,
  //             lunch_menu: [
  //               { id: 3, quantity: 1, name: 'menu3', kcal: 333 },
  //               { id: 4, quantity: 1, name: 'menu4', kcal: 333 },
  //             ],
  //           },
  //           quantity: 2,
  //         },
  //         {
  //           lunch: {
  //             id: 3,
  //             name: '도시락3',
  //             description: '신선한 도시락3',
  //             total_price: 10000,
  //             lunch_menu: [
  //               { id: 3, quantity: 1, name: 'menu3', kcal: 333 },
  //               { id: 4, quantity: 1, name: 'menu4', kcal: 333 },
  //             ],
  //           },
  //           quantity: 2,
  //         },
  //       ],
  //     },
  //     {
  //       id: 3,
  //       user: 1,
  //       request_things: '특별 요청사항',
  //       name: '김철수',
  //       status: 1,
  //       address: '서울시 강남구',
  //       contact_number: '010-1234-5678',
  //       is_disposable: false,
  //       total_price: 10000,
  //       created_at: '2024-07-28T14:35:04.020057+09:00',
  //       items: [
  //         {
  //           lunch: {
  //             id: 1,
  //             name: '도시락1',
  //             description: '신선한 도시락',
  //             total_price: 10000,
  //             lunch_menu: [
  //               { id: 1, quantity: 1, name: 'menu1', kcal: 333 },
  //               { id: 2, quantity: 2, name: 'menu2', kcal: 333 },
  //             ],
  //           },
  //           quantity: 1,
  //         },
  //       ],
  //     },
  //     {
  //       id: 4,
  //       user: 1,
  //       request_things: '특별 요청사항',
  //       name: '김철수',
  //       status: -1,
  //       address: '서울시 강남구',
  //       contact_number: '010-1234-5678',
  //       is_disposable: false,
  //       total_price: 10000,
  //       created_at: '2024-07-25T14:35:04.020057+09:00',
  //       items: [
  //         {
  //           lunch: {
  //             id: 1,
  //             name: '도시락1',
  //             description: '신선한 도시락',
  //             total_price: 10000,
  //             lunch_menu: [
  //               { id: 1, quantity: 1, name: 'menu1', kcal: 333 },
  //               { id: 2, quantity: 2, name: 'menu2', kcal: 333 },
  //             ],
  //           },
  //           quantity: 1,
  //         },
  //       ],
  //     },
  //   ],
  // };

  return (
    <div>
      <div className='inner mx-auto w-[95%] headerBreak:w-[1775px]'>
        <h2 className='mb-[20px] mt-[50px] border-b border-border pb-[10px] text-[22px] font-semibold'>
          도시락 주문 내역
        </h2>
        <div>
          {hasOrders ? (
            <HasOrder orderLists={orderLists} />
          ) : (
            <NoOrder message={noOrderMessage} />
          )}
        </div>
      </div>
    </div>
  );
};

const HasOrder = ({ orderLists }: { orderLists: Order[] }) => {
  return (
    <div className='customScroll h-custom-calc1 overflow-y-scroll'>
      <ul className='flex h-[60px] items-center pr-[10px] text-center'>
        <li className='w-1/6 text-[18px] text-caption'>주문상태</li>
        <li className='w-1/6 text-[18px] text-caption'>주문내용</li>
        <li className='w-1/6 text-[18px] text-caption'>결제일</li>
        <li className='w-1/6 text-[18px] text-caption'>금액</li>
        <li className='w-1/6 text-[18px] text-caption'>주문상세</li>
        <li className='w-1/6 text-[18px] text-caption'>주문취소</li>
      </ul>
      <ul>
        {orderLists.map((item) => (
          <OrderItem
            key={item.id}
            id={item.id}
            status={item.status}
            amount={item.items.length}
            totalPrice={item.total_price}
            date={item.created_at}
          />
        ))}
      </ul>
    </div>
  );
};

const NoOrder = ({ message }: { message: string }) => {
  return (
    <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
      <img src={noOrder} alt='' aria-hidden className='mx-auto mb-[20px]' />
      <p className='text-lg text-caption'>{message}</p>
    </div>
  );
};

export default OrderHistories;
