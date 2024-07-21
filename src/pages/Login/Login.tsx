import React, { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import dosilockLogo from '../../assets/images/dosilockLogo.png';
import googleLogo from '../../assets/images/googleLogo.png';
import kakaoLogo from '../../assets/images/kakaoLogo.png';
import naverLogo from '../../assets/images/naverLogo.png';
import { Link, useNavigate } from 'react-router-dom';

// 1. 아이디
// 	1. 유효성 검사 없음
// 2. 비밀번호
// 	1. 유효성 검사 없음
// 3. 로그인 버튼을 눌렀을때
// 	- 버튼 비활성화 해제
// 	- 아이디, 비밀번호 플레이스 홀더 부분을 원래 ui로 변경 -> 이미 한번 틀렸을 경우를 대비
// 	1. 유저가 입력한 아이디, 비밀번호를 서버에 전송
// 		- success
// 			- 유저정보
// 			  1. 토큰으로 받으면 어떻게 생겨먹은 토큰인지 (진짜 토큰인지, 아니면 response class인지)
// 				  1. 그 토큰을 웹에서 어떻게 활용할 수 있는지 -> 소셜 로그인?
// 			  2. 쿠키로 받는다는건 뭘 의미하는지?
// 			  3. 토큰을 어느시점에 받아올건지.
// 		- failed
// 			- 에러코드
// 			  1 -> 아이디가 틀렸습니다 노출
// 			  2 -> 비밀번호가 틀렸습니다 노출
// 			  3 -> 둘다 틀렸습니다 노출
// 4. 성공이면 메인페이 이동
// 5. 실패이면 실패 이유 노출

const Login: React.FC = () => {
  const {
    register, //입력을 받고자 하는 모든 필드에 반드시 register 함수를 사용
    handleSubmit,
    formState: { isSubmitting, errors, isValid, isSubmitted }, //이벤트가 미쳐 종료되기전 사용자가 다시클릭하면 양식중복,
    //그래서 해당 이벤트가 끝나고 다시 버튼을 활성화 시켜주기 위한 속성
    //양삭이 현재 제출중인상태인지 아닌지 알수있다.
  } = useForm({ mode: 'onChange' });

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
