import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import {
  FaPlus,
  FaMagnifyingGlass,
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
} from 'react-icons/fa6';
import useOrderStore from '../../store/useOrderStore';
import Dish from './Dish';
import Box from './Box';
import DummyDishList from './DummyDishList.json';
import Pagination from 'react-js-pagination';
import './Pagination.scss';
import '../../assets/css/customScroll.css';

import { useEffect, useState } from 'react';

const Order = () => {
  const [isDroped, setIsDroped] = useState(false);
  const [page, setPage] = useState<number>(1);

  const handleMenudropChange = () => {
    setIsDroped(!isDroped);
  };

  const handlePageCange = (page: number) => {
    setPage(page);
  };

  const {
    isAllergyChecked,
    currentCategory,
    toggleAllergy,
    setCurrentCategory,
    dishList,
    setDishList,
    basket,
    createBox,
    currentPost,
    setCurrentPost,
  } = useOrderStore();

  useEffect(() => {
    setDishList(
      DummyDishList.filter((dish) => dish.category === currentCategory)
    );
  }, [setDishList, currentCategory]);

  const postPerPage: number = 10;
  const indexOfLastPost: number = page * postPerPage;
  const indexOfFirstPost: number = indexOfLastPost - postPerPage;

  useEffect(() => {
    setCurrentPost(dishList.slice(indexOfFirstPost, indexOfLastPost));
  }, [
    setCurrentPost,
    indexOfLastPost,
    indexOfFirstPost,
    dishList,
    page,
    currentCategory,
  ]);

  return (
    <div className='flex h-[calc(100vh-75px)] w-screen flex-row bg-background p-8'>
      <div className='h-full w-64 rounded-xl bg-white'>
        <p className='m-4 text-lg font-medium'>카테고리</p>
        <ul>
          <li>
            <button
              onClick={() => setCurrentCategory('recommend')}
              className={`flex h-14 w-full content-center items-center justify-between px-4 hover:bg-primary hover:font-semibold hover:text-white ${currentCategory === 'recommend' ? 'bg-primary font-semibold text-white' : ''}`}
            >
              추천 도시락
            </button>
          </li>
          <li>
            <button
              className='flex h-14 w-full content-center items-center justify-between px-4 hover:bg-primary hover:font-semibold hover:text-white'
              onClick={handleMenudropChange}
            >
              구성
              {isDroped ? <IoChevronDown /> : <IoChevronUp />}
            </button>
            <ul className={isDroped ? '' : 'hidden'}>
              <li>
                <button
                  onClick={() => setCurrentCategory('밥')}
                  className={`flex h-14 w-full content-center items-center justify-between bg-border px-4 hover:bg-primary hover:font-semibold hover:text-white ${currentCategory === '밥' ? 'bg-primary font-semibold text-white' : ''}`}
                >
                  밥
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentCategory('국')}
                  className={`flex h-14 w-full content-center items-center justify-between bg-border px-4 hover:bg-primary hover:font-semibold hover:text-white ${currentCategory === '국' ? 'bg-primary font-semibold text-white' : ''}`}
                >
                  국 / 찌개
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentCategory('반찬')}
                  className={`flex h-14 w-full content-center items-center justify-between bg-border px-4 hover:bg-primary hover:font-semibold hover:text-white ${currentCategory === '반찬' ? 'bg-primary font-semibold text-white' : ''}`}
                >
                  반찬
                </button>
              </li>
            </ul>
          </li>
          <li>
            <li>
              <button
                onClick={() => setCurrentCategory('others')}
                className={`flex h-14 w-full content-center items-center justify-between px-4 hover:bg-primary hover:font-semibold hover:text-white ${currentCategory === 'others' ? 'bg-primary font-semibold text-white' : ''}`}
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
            {currentCategory === 'recommend'
              ? '추천도시락'
              : currentCategory === 'bob'
                ? '밥'
                : currentCategory === 'gook'
                  ? '국 / 찌개'
                  : currentCategory === 'chan'
                    ? '반찬'
                    : '기타'}
          </p>
          <div className='mx-8 flex h-5/6 w-56 flex-row items-center justify-between rounded-xl bg-white px-2'>
            <input
              type='text'
              placeholder='검색어를 입력하세요.'
              className='w-full cursor-none'
            ></input>
            <FaMagnifyingGlass />
          </div>
          <label className='ml-auto flex cursor-none select-none items-center'>
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
          {currentPost.map((dish, i) => (
            <Dish key={i} dish={dish} />
          ))}
        </div>
        <Pagination
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={dishList.length}
          pageRangeDisplayed={5}
          prevPageText={<FaAngleLeft />}
          nextPageText={<FaAngleRight />}
          firstPageText={<FaAnglesLeft />}
          lastPageText={<FaAnglesRight />}
          onChange={handlePageCange}
        />
      </div>
      <div className='flex w-64 flex-col justify-between rounded-xl bg-white p-4'>
        <p className='text-lg font-medium'>장바구니</p>
        <ul className='customScroll my-4 -mr-3 flex h-full flex-col gap-4 overflow-auto pr-4'>
          {basket.map((box) => (
            <li key={box.id}>
              <Box box={box} />
            </li>
          ))}
        </ul>
        <button
          className='flex w-full items-center justify-center rounded-xl bg-gray30 p-3 font-semibold text-white hover:bg-dark'
          onClick={createBox}
        >
          도시락 추가하기 <FaPlus className='ml-2' />
        </button>
        <div className='flex items-end justify-between py-4'>
          <p>금액</p>
          <p>
            <span className='mr-0.5 text-2xl font-semibold'>10,000</span>원
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
