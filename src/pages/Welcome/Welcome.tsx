import React, { useEffect, useState } from 'react';
import dosirockLogo from '../../assets/images/dosirockLogo.png';
import welcome from '../../assets/images/welcome.png';
import { Link, useNavigate } from 'react-router-dom';
import ReactCanvasConfetti from './confetti';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const [fire, setFire] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 confetti 효과를 실행
    setFire(true);
    // 일정 시간 후 fire 상태를 false로 변경하여 한 번만 발사되도록 합니다.
    const timer = setTimeout(() => setFire(false), 1000);

    // 클린업 함수로 타이머를 해제합니다.
    return () => clearTimeout(timer);
  }, []);

  const handleGoLogin = () => {
    sessionStorage.removeItem('accessToken');
    // sessionStorage.removeItem('refresh_token');
    // sessionStorage.removeItem('user');
    navigate('/login');
  };
  const handleGoHome = () => {
    sessionStorage.removeItem('accessToken');
    // sessionStorage.removeItem('refresh_token');
    // sessionStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className='flex h-screen items-center justify-center'>
      <div>
        <ReactCanvasConfetti fire={fire} className='pointer-events-none' />
      </div>
      <div className='flex h-[728px] w-[609px] flex-col items-center justify-center'>
        <Link to='/'>
          <img
            src={dosirockLogo}
            alt='Logo'
            className='mb-[66px] h-[73px] w-[200px]'
          />
        </Link>
        <div>
          <img
            src={welcome}
            alt='welcome 이미지'
            className='mb-[62px] h-[296px] w-[433px]'
          />
          <div className='mb-[24px] text-center text-3xl font-medium leading-10 text-main'>
            회원가입이 완료되었습니다.
          </div>
          <div className='font-xl mb-[61px] text-center font-normal leading-10 text-caption'>
            이제 도시락도 락이다의 서비스를 이용해보세요!
          </div>
        </div>
        <div className='flex flex-row'>
          <button
            onClick={handleGoLogin}
            className='mr-[27px] flex h-[70px] w-[291px] cursor-none items-center justify-center rounded-[12px] border bg-primary font-bold text-white'
          >
            로그인 하기
          </button>
          <button
            onClick={handleGoHome}
            className='flex h-[70px] w-[291px] cursor-none items-center justify-center rounded-[12px] border bg-[#3C3A37] font-bold text-white'
          >
            메인으로
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
