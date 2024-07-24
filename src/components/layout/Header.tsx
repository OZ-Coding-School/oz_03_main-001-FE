import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/dosirockLogo.png';

const Header = () => {
  const location = useLocation();
  const orderPaths: string[] = ['/order', '/orderDetail', '/orderHistory'];
  const CommunityPaths: string[] = ['/community'];

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
          <button className='h-[38px] w-[85px] rounded-full bg-border font-medium hover:bg-gray20'>
            <Link to='/login'>로그인</Link>
          </button>
        </div>
      </header>
      <div></div>
    </>
  );
};

export default Header;
