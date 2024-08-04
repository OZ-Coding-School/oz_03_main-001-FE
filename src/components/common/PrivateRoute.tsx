/* eslint-disable react-hooks/exhaustive-deps */
// import React, { useCallback, useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import useVerify from '../../hooks/useVerify';

// interface DefaultProps {
//   [key: string]: unknown;
// }

// interface PrivateRouteProps {
//   element: React.ComponentType<DefaultProps>;
//   [key: string]: unknown;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({
//   element: Component,
//   ...rest
// }) => {
//   const { checkLoginStatus } = useVerify();
//   const { pathname } = useLocation();
//   const [isVerified, setIsVerified] = useState<boolean | null>(false);

//   const verifyUser = useCallback(async () => {
//     try {
//       await checkLoginStatus();
//       setIsVerified(true);
//     } catch (error) {
//       setIsVerified(false);
//     }
//   }, [checkLoginStatus]);

//   useEffect(() => {
//     verifyUser();
//   }, [verifyUser, checkLoginStatus, pathname]);

//   if (!isVerified) {
//     return;
//   } else {
//     return (
//       <div className='Page_wrapper'>
//         <Component {...rest} />
//       </div>
//     );
//   }
// };

// export default PrivateRoute;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface DefaultProps {
  [key: string]: unknown;
}

interface PrivateRouteProps {
  element: React.ComponentType<DefaultProps>;
  [key: string]: unknown;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element: Component,
  ...rest
}) => {
  const { pathname } = useLocation();
  const [isVerified, setIsVerified] = useState<boolean | null>(false);
  const navigate = useNavigate();

  // 엑세스 토큰 확인 함수
  const verifyUser = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
      navigate('/');
    }
  };

  useEffect(() => {
    verifyUser();
  }, [pathname]);

  if (!isVerified) {
    return;
  } else {
    return (
      <div className='Page_wrapper'>
        <Component {...rest} />
      </div>
    );
  }
};

export default PrivateRoute;
