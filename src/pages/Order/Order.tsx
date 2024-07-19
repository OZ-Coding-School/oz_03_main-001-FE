import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { FaPlus, FaMagnifyingGlass } from 'react-icons/fa6';
import useOrderStore from '../../store/useOrderStore';
import useDishStore from '../../store/useDishStore';
import Dish from './Dish';

import { useEffect, useState } from 'react';

const Order = () => {
  const [isDroped, setIsDroped] = useState(false);

  const handleMenudropChange = () => {
    setIsDroped(!isDroped);
  };

  const {
    isAllergyChecked,
    selectedCategory,
    toggleAllergy,
    selectCurrentCategory,
  } = useOrderStore();

  const { dishList, setDishList } = useDishStore();

  useEffect(() => {
    const dummyDishList = [
      {
        id: 1,
        name: '불고기 도시락',
        description: '맛있는 불고기와 밥',
        kcal: '650 kcal',
        image_url: 'https://example.com/bulgogi.jpg',
        price: 6500,
        category: '한식',
        detailcategory: ['불고기', '밥', '김치'],
      },
      {
        id: 2,
        name: '치킨 샐러드',
        description: '신선한 야채와 치킨',
        kcal: '350 kcal',
        image_url: 'https://example.com/chicken_salad.jpg',
        price: 7500,
        category: '샐러드',
        detailcategory: ['치킨', '양상추', '드레싱'],
      },
      {
        id: 3,
        name: '연어 스테이크',
        description: '구운 연어와 감자',
        kcal: '500 kcal',
        image_url: 'https://example.com/salmon_steak.jpg',
        price: 12000,
        category: '양식',
        detailcategory: ['연어', '감자', '샐러드'],
      },
      {
        id: 4,
        name: '비빔밥',
        description: '다양한 야채와 고추장',
        kcal: '550 kcal',
        image_url: 'https://example.com/bibimbap.jpg',
        price: 8000,
        category: '한식',
        detailcategory: ['밥', '야채', '고추장'],
      },
      {
        id: 5,
        name: '카레 라이스',
        description: '매콤한 카레와 밥',
        kcal: '600 kcal',
        image_url: 'https://example.com/curry_rice.jpg',
        price: 7000,
        category: '일식',
        detailcategory: ['카레', '밥', '감자'],
      },
      {
        id: 6,
        name: '스파게티 볼로네제',
        description: '토마토 소스와 소고기',
        kcal: '650 kcal',
        image_url: 'https://example.com/spaghetti_bolognese.jpg',
        price: 9000,
        category: '양식',
        detailcategory: ['스파게티', '토마토 소스', '소고기'],
      },
      {
        id: 7,
        name: '타코',
        description: '멕시코식 타코',
        kcal: '450 kcal',
        image_url: 'https://example.com/taco.jpg',
        price: 5000,
        category: '멕시코식',
        detailcategory: ['토르티야', '소고기', '채소'],
      },
      {
        id: 8,
        name: '치킨 커틀릿',
        description: '튀긴 치킨과 소스',
        kcal: '700 kcal',
        image_url: 'https://example.com/chicken_cutlet.jpg',
        price: 8500,
        category: '양식',
        detailcategory: ['치킨', '소스', '샐러드'],
      },
      {
        id: 9,
        name: '야끼소바',
        description: '볶은 면과 야채',
        kcal: '600 kcal',
        image_url: 'https://example.com/yakisoba.jpg',
        price: 6500,
        category: '일식',
        detailcategory: ['면', '야채', '소스'],
      },
      {
        id: 10,
        name: '쌀국수',
        description: '베트남식 쌀국수',
        kcal: '400 kcal',
        image_url: 'https://example.com/pho.jpg',
        price: 7000,
        category: '베트남식',
        detailcategory: ['쌀국수', '소고기', '야채'],
      },
    ];
    setDishList(dummyDishList);
  }, [setDishList]);

  return (
    <div className='flex h-screen w-screen flex-row bg-background p-8 pt-[107px]'>
      <div className='h-full w-64 rounded-xl bg-white'>
        <p className='m-4 text-lg font-medium'>카테고리</p>
        <ul>
          <li>
            <button
              onClick={() => selectCurrentCategory('recommend')}
              className={`flex h-14 w-full cursor-pointer content-center items-center justify-between px-4 hover:bg-primary hover:font-semibold hover:text-white ${selectedCategory === 'recommend' ? 'bg-primary font-semibold text-white' : ''}`}
            >
              추천 도시락
            </button>
          </li>
          <li>
            <button
              className='flex h-14 w-full cursor-pointer content-center items-center justify-between px-4 hover:bg-primary hover:font-semibold hover:text-white'
              onClick={handleMenudropChange}
            >
              구성
              {isDroped ? <IoChevronDown /> : <IoChevronUp />}
            </button>
            <ul className={isDroped ? '' : 'hidden'}>
              <li>
                <button
                  onClick={() => selectCurrentCategory('bob')}
                  className={`flex h-14 w-full cursor-pointer content-center items-center justify-between bg-border px-4 hover:bg-primary hover:font-semibold hover:text-white ${selectedCategory === 'bob' ? 'bg-primary font-semibold text-white' : ''}`}
                >
                  밥
                </button>
              </li>
              <li>
                <button
                  onClick={() => selectCurrentCategory('gook')}
                  className={`flex h-14 w-full cursor-pointer content-center items-center justify-between bg-border px-4 hover:bg-primary hover:font-semibold hover:text-white ${selectedCategory === 'gook' ? 'bg-primary font-semibold text-white' : ''}`}
                >
                  국 / 찌개
                </button>
              </li>
              <li>
                <button
                  onClick={() => selectCurrentCategory('chan')}
                  className={`flex h-14 w-full cursor-pointer content-center items-center justify-between bg-border px-4 hover:bg-primary hover:font-semibold hover:text-white ${selectedCategory === 'chan' ? 'bg-primary font-semibold text-white' : ''}`}
                >
                  반찬
                </button>
              </li>
            </ul>
          </li>
          <li>
            <li>
              <button
                onClick={() => selectCurrentCategory('others')}
                className={`flex h-14 w-full cursor-pointer content-center items-center justify-between px-4 hover:bg-primary hover:font-semibold hover:text-white ${selectedCategory === 'others' ? 'bg-primary font-semibold text-white' : ''}`}
              >
                기타
              </button>
            </li>
          </li>
        </ul>
      </div>
      <div className='bg-backgound mx-8 flex w-9/12 flex-col justify-between'>
        <div className='flex h-10 flex-row items-center justify-between'>
          <p className='w-1/12 text-caption'>
            {selectedCategory === 'recommend'
              ? '추천도시락'
              : selectedCategory === 'bob'
                ? '밥'
                : selectedCategory === 'gook'
                  ? '국 / 찌개'
                  : selectedCategory === 'chan'
                    ? '반찬'
                    : '기타'}
          </p>
          <div className='mx-8 flex h-5/6 w-56 flex-row items-center justify-between rounded-xl bg-white px-2'>
            <input
              type='text'
              placeholder='검색어를 입력하세요.'
              className='w-full'
            ></input>
            <FaMagnifyingGlass />
          </div>
          <label className='ml-auto flex cursor-pointer select-none items-center'>
            <div className='relative mx-2'>
              <input
                type='checkbox'
                checked={isAllergyChecked}
                onChange={toggleAllergy}
                className='sr-only'
              ></input>
              <div
                className={`box block h-6 w-10 rounded-full ${
                  isAllergyChecked ? 'bg-primary' : 'bg-gray20'
                }`}
              ></div>
              <div
                className={`absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white transition ${
                  isAllergyChecked ? 'translate-x-full' : ''
                }`}
              ></div>
            </div>
            <span>알러지 유발 식품 제외</span>
          </label>
        </div>
        <div className='my-8 grid h-5/6 grid-cols-5 justify-between gap-4'>
          {dishList.map((dish, i) => (
            <Dish key={i} dish={dish} />
          ))}
        </div>
        <div className='h-10 bg-gray30'>page</div>
      </div>
      <div className='flex w-64 flex-col justify-between rounded-xl bg-white p-4'>
        <p className='text-lg font-medium'>장바구니</p>
        <div className='h-full'></div>
        <button className='flex w-full items-center justify-center rounded-xl bg-gray30 p-3 font-semibold text-white hover:bg-dark'>
          도시락 추가하기 <FaPlus className='ml-2' />
        </button>
        <div className='flex items-end justify-between py-4'>
          <p>금액</p>
          <p>
            <span className='text-2xl font-semibold'>10,000</span>원
          </p>
        </div>
        <button className='w-full rounded-xl bg-primary p-3 font-semibold text-white hover:bg-primary-hover'>
          주문하기
        </button>
      </div>
    </div>
  );
};

export default Order;
