import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LogoutProps {
  provider: string;
}

const Logout: React.FC<LogoutProps> = ({ provider }) => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.post(
        //백엔드 로그아웃 엔드포인트 호출
        'https://kauth.kakao.com/oauth/logout',
        { provider }, // 여러 소셜의 로그아웃을 처리하기 위한 prop 서버로 전달
        { withCredentials: true } //쿠키보내기
      );
      navigate('/'); //로그아웃 후 홈으로 리디렉션
    } catch (error) {
      console.error('로그아웃 에러:', error);
    }
  };
  return <button onClick={logout}>로그아웃</button>;
};

export default Logout;
