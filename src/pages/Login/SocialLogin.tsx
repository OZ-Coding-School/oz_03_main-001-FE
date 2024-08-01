import kakaoLogo from '../../assets/images/kakaoLogo.png';

const SocialLogin = () => {
  // 카카오 로그인으로 리디렉션 (백엔드 리다이렉션 url입력)
  const kakaoLoginUrl = () => {
    window.location.href = 'https://api.dosirock.store/v1/users/kakao/';
  };

  return (
    <div>
      <button
        onClick={kakaoLoginUrl}
        className='ml-[9px] h-[50px] w-[50px] cursor-none'
      >
        <img
          src={kakaoLogo}
          alt='카카오 로그인 로고'
          className='h-[full] w-[full]'
        />
      </button>
    </div>
  );
};

export default SocialLogin;
