import { useCallback } from 'react';
import { Api } from '../api/api';
import { useNavigate } from 'react-router-dom';

/**
 *
 * @function checkLoginStatus 유저 토큰 유효성을 검증하고, 새로 발급합니다.
 */
const useVerify = () => {
  const nav = useNavigate();

  const checkLoginStatus = useCallback(async () => {
    try {
      await Api.userTokenVerify();
    } catch (error) {
      console.log('토큰 검증 실패. 재시도..');
      try {
        await Api.userTokenRefresh();
        await Api.userTokenVerify();
      } catch (error) {
        console.error('토큰 검증 및 갱신 실패 :', error);
        nav('/', { replace: true });
      }
    }
  }, [nav]);

  return {
    checkLoginStatus,
  };
};

export default useVerify;
