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
import Pagination from 'react-js-pagination';
import './Pagination.scss';
import '../../assets/css/customScroll.css';
import axios from 'axios';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Order = () => {
  const [isDroped, setIsDroped] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);

  const handleMenudropChange = () => {
    setIsDroped(!isDroped);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const {
    isAllergyChecked,
    currentCategory,
    toggleAllergy,
    setCurrentCategory,
    basket,
    createBox,
    currentPost,
    setCurrentPost,
    totalPrice,
    setTotalPrice,
  } = useOrderStore();

  useEffect(() => {
    const getApiMenus = async () => {
      try {
        const params = {
          page: page,
          size: 10,
          category: currentCategory,
        };

        const response = await axios.get(
          'https://api.dosirock.store/v1/menus/',
          { params }
        );
        setCurrentPost(response.data.results);
        setTotalItemsCount(response.data.total_count);
      } catch (err) {
        console.log(err);
      }
    };
    getApiMenus();
  }, [setCurrentPost, page, currentCategory]);

  useEffect(() => {
    setTotalPrice(basket.reduce((sum, box) => sum + box.boxPrice, 0));
  }, [basket, setTotalPrice]);

  return (
    <div className='bottom-0 flex h-[calc(100vh-75px)] w-screen flex-row bg-background p-8'>
      <div className='h-full w-64 rounded-xl bg-white'>
        <p className='m-4 text-lg font-medium'>카테고리</p>
        <ul>
          <li>
            <button
              onClick={() => setCurrentCategory('recommend')}
              className={`flex h-14 w-full content-center items-center justify-between px-4 duration-100 hover:bg-primary hover:font-semibold hover:text-white ${currentCategory === 'recommend' ? 'bg-primary font-semibold text-white' : ''}`}
            >
              추천 도시락
            </button>
          </li>
          <li>
            <button
              className='flex h-14 w-full content-center items-center justify-between px-4 duration-100 hover:bg-primary hover:font-semibold hover:text-white'
              onClick={handleMenudropChange}
            >
              구성
              {isDroped ? <IoChevronDown /> : <IoChevronUp />}
            </button>
            <ul className={isDroped ? '' : 'hidden'}>
              <li>
                <button
                  onClick={() => setCurrentCategory('bob')}
                  className={`flex h-14 w-full content-center items-center justify-between bg-border px-4 duration-100 hover:bg-primary hover:font-semibold hover:text-white ${currentCategory === 'bob' ? 'bg-primary font-semibold text-white' : ''}`}
                >
                  밥
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentCategory('guk')}
                  className={`flex h-14 w-full content-center items-center justify-between bg-border px-4 duration-100 hover:bg-primary hover:font-semibold hover:text-white ${currentCategory === 'guk' ? 'bg-primary font-semibold text-white' : ''}`}
                >
                  국 / 찌개
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentCategory('chan')}
                  className={`flex h-14 w-full content-center items-center justify-between bg-border px-4 duration-100 hover:bg-primary hover:font-semibold hover:text-white ${currentCategory === 'chan' ? 'bg-primary font-semibold text-white' : ''}`}
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
                className={`flex h-14 w-full content-center items-center justify-between px-4 duration-100 hover:bg-primary hover:font-semibold hover:text-white ${currentCategory === 'others' ? 'bg-primary font-semibold text-white' : ''}`}
              >
                기타
              </button>
            </li>
          </li>
        </ul>
      </div>
      <div className='bg-backgound bottom-0 mx-8 flex w-9/12 flex-col justify-between'>
        <div className='flex h-10 flex-row items-center justify-between'>
          <p className='w-1/12 text-caption'>
            {currentCategory === 'recommend'
              ? '추천도시락'
              : currentCategory === 'bob'
                ? '밥'
                : currentCategory === 'guk'
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
        <div className='grid grid-cols-5 grid-rows-2 gap-[2vh]'>
          {currentPost.map((dish, i) => (
            <Dish key={i} dish={dish} />
          ))}
        </div>
        <Pagination
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={5}
          prevPageText={<FaAngleLeft />}
          nextPageText={<FaAngleRight />}
          firstPageText={<FaAnglesLeft />}
          lastPageText={<FaAnglesRight />}
          onChange={handlePageChange}
        />
      </div>
      <div className='flex w-64 flex-col justify-between rounded-xl bg-white p-4'>
        <p className='text-lg font-medium'>장바구니</p>
        <ul className='customScroll my-4 flex h-full flex-col gap-4 overflow-auto pb-2'>
          {basket.map((box) => (
            <li key={box.id}>
              <Box box={box} />
            </li>
          ))}
        </ul>
        <button
          className='flex w-full items-center justify-center rounded-xl bg-gray30 p-3 font-semibold text-white duration-100 hover:bg-dark hover:font-extrabold'
          onClick={createBox}
        >
          도시락 추가하기 <FaPlus className='ml-2' />
        </button>
        <div className='flex items-end justify-between py-4'>
          <p>금액</p>
          <p>
            <span className='mr-0.5 text-2xl font-semibold'>
              {totalPrice.toLocaleString()}
            </span>
            원
          </p>
        </div>
        <Link
          to='/orderDetail'
          className='flex w-full justify-center rounded-xl bg-primary p-3 font-semibold text-white duration-100 hover:bg-primary-hover hover:font-extrabold'
        >
          주문하기
        </Link>
      </div>
    </div>
  );
};

export default Order;
