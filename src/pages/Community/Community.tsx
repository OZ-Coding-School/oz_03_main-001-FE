import React from 'react';
import img from '../../assets/images/development.svg';

const Community = () => {
  return (
    <div className='fixed bottom-0 left-0 right-0 top-0 overflow-hidden'>
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center'>
        <img src={img} alt='' aria-hidden className='mb-[60px]' />
        <p className='mb-[30px] text-[25px]'>
          서비스 <span className='font-bold'>준비중</span> 입니다.
        </p>
        <p className='text-[18px]'>
          커뮤니티 서비스는 개발 예정입니다.
          <br />
          이용에 불편을 드려 죄송합니다.
        </p>
      </div>
    </div>
  );
};

export default Community;
