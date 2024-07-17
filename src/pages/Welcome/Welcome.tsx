import React from 'react';
import dosilockLogo from '../../assets/images/dosilockLogo.png';
import welcome from '../../assets/images/welcome.png';

const Welcome: React.FC = () => {
  return (
    <div>
      <img src={dosilockLogo} />
      <img src={welcome} />
      <div>회원가입이 완료되었습니다.</div>
      <div>이제 도시락도 락이다의 서비스를 이용해보세요!</div>
      <button>로그인 하기</button>
      <button>메인으로</button>
    </div>
  );
};

export default Welcome;
