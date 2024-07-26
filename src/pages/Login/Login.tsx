import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import dosirockLogo from '../../assets/images/dosirockLogo.png';
import googleLogo from '../../assets/images/googleLogo.png';
import naverLogo from '../../assets/images/naverLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { LoginRequest } from '../../types/loginTypes';
import Modal from './Modal/Modal';
import axios from 'axios';
import SocialLogin from '../Login/SocialLogin';

const Login: React.FC = () => {
  // 모달 상태 관리
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [loginCheck, setLoginCheck] = useState<string | null>(null); // 로그인 실패 상태

  //useForm
  const {
    register, //입력을 받고자 하는 모든 필드에 반드시 register 함수를 사용
    handleSubmit,
    formState: { isSubmitting, errors, isValid, isSubmitted },
    //폼의 정보를 포함한 객체 { 제출중인지 상태여부 , 각 필드의 오류메세지나 상태를 저장 , 모든 필드가 유효한지 여부 (버튼비활성화위함) , 폼이 한번이라도 제출된 적 있는지 여부}
    //watch, //사용자가 입력하는 값을 실시간으로 볼수있음
  } = useForm<LoginRequest>({ mode: 'onChange' });
  // console.log(watch);

  const navigate = useNavigate();

  // 로그인 로직
  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    try {
      const response = await axios.post(
        '/api/v1/users/login',
        {
          id: data.id,
          password: data.password,
        },
        { withCredentials: true }
      );
      // console.log(response);

      const result = response.data;

      if (response.status === 200) {
        //성공
        sessionStorage.setItem('id', result.id);
        console.log('로그인 성공, 로그인 유저:', result.id);
        setLoginCheck(null);
        navigate('/'); //홈페이지로 이동
      } else if (response.status === 400) {
        //잘못된 값 입력됐을때 에러
        setLoginCheck('잘못된 값이 입력되었습니다.');
        console.log(setLoginCheck);
      } else if (response.status === 500) {
        //서버 내부 에러
        setLoginCheck(
          '서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
        );
        console.log(setLoginCheck);
        // setModalOpen(true);
      }
    } catch (error) {
      console.error('로그인 요청 중 에러 발생:', error);
      setModalMessage('오류가 발생했습니다. 다시 시도해 주세요.');
      setModalOpen(true);
    }
  };

  return (
    <div>
      <div className='flex h-screen flex-col items-center justify-center'>
        <Link to='/'>
          <img
            src={dosirockLogo}
            alt='Logo'
            className='mb-[28px] flex h-[73px] w-[200px]'
          />
        </Link>

        {/* 여기서부터 제출 폼 */}
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className='w-[490px] rounded-[28px] border border-border px-[43px] pb-[46px] pt-[40px]'
          autoComplete='off'
        >
          <div className='mb-[14px] text-xl font-medium leading-10 text-main'>
            로그인
          </div>
          <div className='flex flex-col items-center'>
            <input
              {...register('id', {
                required: {
                  value: true,
                  message: '아이디를 입력해주세요',
                },
                // minLength: {
                //   value: 1,
                //   message: '아이디를 입력해주세요',
                // },
              })}
              aria-invalid={
                isSubmitted ? (errors.id ? 'true' : 'false') : undefined
              }
              type='text'
              placeholder='아이디'
              //   required //반드시 값을 입력해야할때
              className='h-[60px] w-[410px] rounded-[12px] border border-border px-[20px] py-[12px]'
              style={{
                border: ' 1px solid ',
                borderColor: errors.id ? 'red' : '#E6E6E6',
              }}
            />
            <div className='l-75 w-full pl-[15px] text-left text-primary'>
              {errors.id && <small>아이디를 입력해주세요</small>}
            </div>

            <input
              {...register('password', {
                required: {
                  value: true,
                  message: '비밀번호를 입력해주세요',
                },
              })}
              aria-invalid={
                isSubmitted ? (errors.password ? 'true' : 'false') : undefined
              }
              id='password'
              type='password'
              placeholder='비밀번호'
              required //반드시 값을 입력해야할때
              className='mt-[14px] h-[60px] w-[410px] rounded-[12px] border px-[20px] py-[12px]'
              style={{
                border: ' 1px solid ',
                borderColor: errors.id ? 'red' : '#E6E6E6',
              }}
            />
            <div className='l-75 w-full pl-[15px] text-left text-primary'>
              {errors.password && <small>비밀번호를 입력해주세요</small>}
            </div>
            <div className='relative'>
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
              {/* {modalMessage && (
                <div className='l-75 mt-1 w-full pl-[15px] text-left text-[12.8px] text-primary'>
                  {modalMessage}
                </div>
              )} */}
              <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                {modalMessage}
              </Modal>
            </div>
          </div>
          <div className='mb-[12px] flex flex-col items-center'>
            <Link
              to='/join'
              className='/* var(--gray-300) mb-[18px] mt-[14px] h-[35px] w-[330px] text-center text-base font-semibold leading-10 text-main'
            >
              회원가입
            </Link>
            <div className='h-[35px] w-[330px] text-center text-caption'>
              SNS계정으로 간편 로그인 / 회원가입
            </div>
          </div>
          <div className='flex flex-row justify-center'>
            {/* <img
              src={googleLogo}
              alt='구글로그인 로고'
              className='mr-[9px] h-[50px] w-[50px]'
            /> */}
            <SocialLogin />
            {/* <img
              src={kakaoLogo}
              alt='카카오 로그인 로고'
              className='mr-[9px] h-[50px] w-[50px]'
            /> */}
            {/* <img
              src={naverLogo}
              alt='네이버로그인 로고'
              className='ml-[9px] h-[50px] w-[50px]'
            /> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

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
// 			  1 -> 아이디 글자수 맞춰 입력해달라 (0)
// 			  2 -> 비밀번호 글자수 맞춰 입력해달라 (0)
// 			  3 -> 둘다 틀렸습니다 노출
// 4. 성공이면 메인페이 이동
// 5. 실패이면 실패 이유 노출
//없었을때 테두리 글자랑 똑같은색

//로그인 눌렀을때 기존정보에 서버와 아이디가 다르면
//“ 아이디와 비밀번호를 정확히 입력해주세요 “ 라고 메세지 뜨게하기

//api/v1/users/login
