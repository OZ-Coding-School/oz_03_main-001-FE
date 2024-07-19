import React from 'react';
import dosilockLogo from '../../assets/images/dosirockLogo.png';
import welcome from '../../assets/images/welcome.png';
import { Link } from 'react-router-dom';

const Welcome: React.FC = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='flex h-[728px] w-[609px] flex-col items-center justify-center'>
        <img
          src={dosilockLogo}
          alt='Logo'
          className='mb-[66px] h-[73px] w-[200px]'
        />
        <div>
          <img
            src={welcome}
            alt='welcome 이미지'
            className='mb-[62px] h-[296px] w-[433px]'
          />
          <div className='mb-[24px] text-center text-3xl font-medium leading-10 text-[#333333]'>
            회원가입이 완료되었습니다.
          </div>
          <div className='font-xl mb-[61px] text-center font-normal leading-10 text-[#6F6F6F]'>
            이제 도시락도 락이다의 서비스를 이용해보세요!
          </div>
        </div>
        <div className='flex flex-row'>
          <Link
            to='/login'
            className='mr-[27px] inline-block flex h-[70px] w-[291px] items-center justify-center rounded-[12px] border bg-[#EC6446] font-bold text-[#ffffff]'
          >
            로그인 하기
          </Link>
          <Link
            to='/'
            className='inline-block flex h-[70px] w-[291px] items-center justify-center rounded-[12px] border bg-[#3C3A37] font-bold text-[#ffffff]'
          >
            메인으로
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
