// src/components/CallbackHandler.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      console.log('Authorization Code:', code); //임시 배포전 없애야함

      if (code) {
        try {
          await axios.post(
            //post요청을 보낼 인증코드 서버  (엑세스토큰을 발급받을 코드 보내기)
            'https://127.0.0.1:8000/api/v1/users/kakao/callback/',
            { code }
          );
          navigate('/'); // 로그인 성공 후 홈으로 리디렉션
        } catch (error) {
          console.error('Error handling callback:', error);
        }
      }
    };

    handleCallback();
  }, [navigate]);

  return <p>처리 중...</p>;
};

export default LoginRedirect;
