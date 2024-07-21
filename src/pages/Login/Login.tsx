import React, { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import dosilockLogo from '../../assets/images/dosilockLogo.png';
import googleLogo from '../../assets/images/googleLogo.png';
import kakaoLogo from '../../assets/images/kakaoLogo.png';
import naverLogo from '../../assets/images/naverLogo.png';
import { Link, useNavigate } from 'react-router-dom';

/** 
로그인 버튼 클릭시
회원가입이 되어있으면 - 메인페이지이동
회원가입 되어있지 않으면 - 회원가입 페이지 이동

로그인 (아이디 또는 비밀번호가 잘못 되었습니다. 정확히 입력해주세요)
**/

const Login: React.FC = () => {
  const {
    register, //입력을 받고자 하는 모든 필드에 반드시 register 함수를 사용
    handleSubmit,
    formState: { isSubmitting, errors, isValid, isSubmitted }, //이벤트가 미쳐 종료되기전 사용자가 다시클릭하면 양식중복,
    //그래서 해당 이벤트가 끝나고 다시 버튼을 활성화 시켜주기 위한 속성
    //양삭이 현재 제출중인상태인지 아닌지 알수있다.
  } = useForm({ mode: 'onChange' });

  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    // 서버에 로그인 요청을 보내는 부분
    try {
      // 여기에 실제 로그인 로직을 추가하세요.
      // 예: const response = await loginUser(data.username, data.password);

      // 여기서는 예시로 서버 응답을 가정합니다.
      const isLoginSuccessful =
        data.id === 'testuser' && data.password === 'Test@1234'; // 간단한 로그인 검증 예시

      if (isLoginSuccessful) {
        navigate('/main'); // 메인 페이지로 이동
      } else {
        setServerError('아이디나 비밀번호가 틀렸습니다. 정확히 입력해 주세요.');
      }
    } catch (error) {
      setServerError('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <div className='flex h-screen flex-col items-center justify-center'>
        <img
          src={dosilockLogo}
          alt='Logo'
          className='mb-[28px] flex h-[73px] w-[200px]'
        />

        {/* 여기서부터 제출 폼 */}
        <form
          onSubmit={handleSubmit((date) => alert(JSON.stringify(date)))}
          className='h-[533px] w-[490px] rounded-[28px] border border-border'
        >
          <div className='mb-[14px] ml-[43px] mt-[39px] text-xl font-medium leading-10 text-main'>
            로그인
          </div>
          <div className='flex flex-col items-center'>
            <input
              {...register('id', {
                required: true,
                pattern: {
                  value: /^[a-zA-Z][a-zA-Z0-9_-]{4,19}$/,
                  message: '아이디를 정확히 입력해 주세요',
                },
              })}
              aria-invalid={
                isSubmitted ? (errors.id ? 'true' : 'false') : undefined
              }
              type='text'
              placeholder='아이디'
              //   required //반드시 값을 입력해야할때
              className='h-[60px] w-[410px] rounded-[12px] border border-border px-4 py-2'
              style={{ border: ' 1px solid #E6E6E6' }}
            />
            {errors.id && <small>{String(errors.id.message)}</small>}

            <input
              {...register('password', {
                required: true,
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/,
                  message: '비밀번호를 정확히 입력해주세요',
                },
              })}
              aria-invalid={
                isSubmitted ? (errors.password ? 'true' : 'false') : undefined
              }
              id='password'
              type='password'
              placeholder='비밀번호'
              required //반드시 값을 입력해야할때
              className='mt-[14px] h-[60px] w-[410px] rounded-[12px] border px-4 py-2'
              style={{ border: ' 1px solid #E6E6E6' }}
            />
            {errors.password && (
              <small>{String(errors.password.message)}</small>
            )}
            <button
              disabled={!isValid || isSubmitting} //양식이 제출되는 중에는 버튼 비활성화
              type='submit'
              className={`mt-9 h-[60px] w-[410px] rounded-[12px] border bg-primary text-center text-lg font-bold leading-[30px] text-white ${
                !isValid || isSubmitting
                  ? 'opacity-50'
                  : 'hover:bg-primary-hover'
              }`}
            >
              로그인
            </button>
          </div>
          <div className='mb-[12px] flex flex-col items-center'>
            <Link
              to='join'
              className='/* var(--gray-300) mb-[18px] mt-[14px] h-[35px] w-[330px] text-center text-base font-semibold leading-10 text-main'
            >
              회원가입
            </Link>
            <div className='h-[35px] w-[330px] text-center text-caption'>
              SNS계정으로 간편 로그인 / 회원가입
            </div>
          </div>
          <div className='flex flex-row justify-center'>
            <img src={googleLogo} className='mr-[9px] h-[50px] w-[50px]' />
            <img src={kakaoLogo} className='mx-[9px] h-[50px] w-[50px]' />
            <img src={naverLogo} className='ml-[9px] h-[50px] w-[50px]' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
