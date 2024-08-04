import axios from 'axios';

// 액세스 토큰을 서버에서 검증하는 API 호출
export const Api = {
  // 토큰 검증 API 호출
  userTokenVerify: async () => {
    try {
      const response = await axios.post(
        'https://api.dosirock.store/v1/users/login/simpleJWT/verify',
        // { credential: 'include' }
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('토큰 검증 오류 : ', error);
      throw error;
    }
  },

  // 토큰 갱신 API 호출
  userTokenRefresh: async () => {
    try {
      const response = await axios.post(
        'https://api.dosirock.store/v1/users/login/simpleJWT/refresh',
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('토큰 갱신 오류 :', error);
      throw error;
    }
  },
};
