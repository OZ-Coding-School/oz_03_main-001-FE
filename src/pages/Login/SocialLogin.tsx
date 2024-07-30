import kakaoLogo from '../../assets/images/kakaoLogo.png';
import googleLogo from '../../assets/images/googleLogo.png';
import naverLogo from '../../assets/images/naverLogo.png';

const SocialLogin = () => {
  // const handleKakaoLogin = () => {
  //   const REST_API_KEY = 'YOUR_KAKAO_REST_API_KEY'; // 카카오 REST API 키
  //   const REDIRECT_URI = 'http://127.0.0.1:3000/kakao/callback'; // 프론트엔드 콜백 URL
  //   const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  //   window.location.href = kakaoAuthUrl;
  // };

  // 카카오 로그인으로 리디렉션 (백엔드 리디렉션 url입력)
  const kakaoLoginUrl = () => {
    window.location.href = 'http://127.0.0.1:8000/api/v1/users/kakao/callback/';
  };

  return (
    <div>
      <button onClick={kakaoLoginUrl} className='mr-[9px] h-[50px] w-[50px]'>
        <img
          src={googleLogo}
          alt='구글로그인 로고'
          className='mr-[9px] h-[50px] w-[50px]'
        />
      </button>
      <button onClick={kakaoLoginUrl} className='ml-[9px] h-[50px] w-[50px]'>
        <img
          src={kakaoLogo}
          alt='카카오 로그인 로고'
          className='h-[full] w-[full]'
        />
      </button>
      <button onClick={kakaoLoginUrl} className='ml-[9px] h-[50px] w-[50px]'>
        <img
          src={naverLogo}
          alt='네이버로그인 로고'
          className='ml-[9px] h-[50px] w-[50px]'
        />
      </button>
    </div>
  );
};

export default SocialLogin;

//페이지가 동작할건 로그인했을때 유즈이펙트 겟 요청을 백엔드가 준 정보를 조회할수있는 api 에 요청해서 가져오고
//토큰도 받아온다.

// 참고로 인가코드 발급을 위해 카카오 페이지로 이동 후,
// 리다이렉트하는 이유는 Ajax 방식으로 요청했을 경우 CORS 에러가 발생하기 때문이다.
// CORS(교차 출처 리소스 공유)는 HTTP 헤더를 사용하여 실행중인 웹사이트가 다른 도메인의 자원에 접근할 수 있도록 브라우저에 알려주는 체제이다.
// 즉, A도메인의 프론트엔드 스크립트가 B도메인을 호출하면 브라우저에서는 기본적으로 요청을 제한한다.
// 따라서 Ajax 방식으로 요청하면 안되고, a태그로 이동해야 한다.
// (* 인가 코드 요청은 CORS가 닫혀 있지만, 카카오 로그인 토큰 발급은 CORS가 열려 있어서 Ajax 요청이 가능하다.)
