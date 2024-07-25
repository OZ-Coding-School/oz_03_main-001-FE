import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import Logo from '../../assets/images/dosirockLogo.png';
import iconOrderHistory from '../../assets/images/orderHistory.png';
import iconLogout from '../../assets/images/logout.png';

const Header = () => {
  const location = useLocation();
  const orderPaths: string[] = ['/order', '/orderDetail', '/orderHistory'];
  const CommunityPaths: string[] = ['/community'];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Node;
    if (dropdownRef.current && !dropdownRef.current.contains(target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {location.pathname === '/' ? <div className='h-[42px] bg-white' /> : null}

      <header className='sticky left-0 right-0 top-0 z-50 bg-white'>
        <div className='inner mx-auto flex h-[75px] w-[95%] items-center justify-between headerBreak:w-[1775px]'>
          <div className='flex items-center'>
            <h1>
              <Link to='/'>
                <img
                  src={Logo}
                  className='w-[118px]'
                  alt='도시락도 락이다 홈'
                />
              </Link>
            </h1>
            <Link
              to='/order'
              className={`ml-[58px] text-lg font-medium hover:text-primary ${orderPaths.includes(location.pathname) ? '!font-bold text-primary' : ''}`}
            >
              주문하기
            </Link>
            <Link
              to='/community'
              className={`ml-[62px] text-lg font-medium hover:text-primary ${CommunityPaths.includes(location.pathname) ? '!font-bold text-primary' : ''}`}
            >
              커뮤니티
            </Link>
          </div>
          {/* 비로그인 시 */}
          {/* <button className='h-[38px] w-[85px] rounded-full bg-border font-medium hover:bg-gray20'>
            <Link to='/login'>로그인</Link>
          </button> */}

          {/* 로그인 시 */}
          <div className='relative' ref={dropdownRef}>
            <button
              className='flex h-[38px] items-center rounded-full bg-white px-[20px] font-medium hover:bg-background'
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen);
              }}
            >
              <span className='mr-[10px]'>
                <span className='userName font-semibold'>홍길동</span> 님
              </span>
              {isDropdownOpen ? <IoChevronUp /> : <IoChevronDown />}
            </button>
            {isDropdownOpen && <UserMenu />}
          </div>
        </div>
      </header>
      <div></div>
    </>
  );
};

const UserMenu = () => {
  return (
    <ul className='absolute left-1/2 top-[50px] w-[160px] -translate-x-1/2 overflow-hidden rounded-lg border border-background bg-white shadow-box'>
      <li className='relative hover:bg-background'>
        <img
          src={iconOrderHistory}
          alt=''
          aria-hidden
          className='absolute left-[20px] top-1/2 -translate-y-1/2'
        />
        <Link to='' className='w-[160px] pl-[50px] text-[15px] leading-[50px]'>
          주문내역
        </Link>
      </li>
      <li className='relative hover:bg-background'>
        <img
          src={iconLogout}
          alt=''
          aria-hidden
          className='absolute left-[20px] top-1/2 -translate-y-1/2'
        />
        <Link to='' className='w-[160px] pl-[50px] text-[15px] leading-[50px]'>
          로그아웃
        </Link>
      </li>
    </ul>
  );
};

export default Header;
