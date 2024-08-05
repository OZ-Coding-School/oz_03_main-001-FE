// import { toast } from 'react-toastify';
import kakaoLogo from '../../assets/images/kakaoLogo.png';

const SocialLogin = () => {
  // 카카오 로그인으로 리디렉션 (백엔드 리디렉션 url입력)
  const kakaoLoginUrl = () => {
    // const CustomToast = () => (
    //   <div>
    //     알레르기 필터링 기능 사용을 위해
    //     <br />
    //     일반 로그인 / 회원가입을 이용해주세요.
    //   </div>
    // );
    // toast.error(<CustomToast />, {
    //   position: 'top-center',
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   style: { width: '320px', background: '#FFF4B8', color: 'black' },
    // });
    window.location.href = 'https://api.dosirock.store/v1/users/kakao/login/';
  };

  return (
    <div>
      <button
        type='button'
        style={{
          filter: 'grayscale(100%)', // 흑백으로 변환
        }}
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
