import React from 'react';
import Logo from '../../assets/images/dosilockLogo.png';

const Header = () => {
  return (
    <header className='fixed left-0 right-0 top-0 z-50 bg-white'>
      {/* <div className='h-[100px] bg-secondary'></div> */}
      <div className='inner mx-auto flex h-[75px] w-[1770px] items-center justify-between'>
        <div className='flex items-center'>
          <h1>
            <a href='#' aria-label='도시락도 락이다'>
              <img src={Logo} aria-hidden className='w-[118px]' />
            </a>
          </h1>
          <a
            href='#'
            className='ml-[58px] text-lg font-medium hover:text-primary'
          >
            주문하기
          </a>
          <a
            href='#'
            className='ml-[62px] text-lg font-medium hover:text-primary'
          >
            커뮤니티
          </a>
        </div>
        <button className='h-[38px] w-[85px] rounded-full bg-border font-medium'>
          로그인
        </button>
      </div>
    </header>
  );
};

export default Header;
