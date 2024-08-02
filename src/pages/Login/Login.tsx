import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import dosirockLogo from '../../assets/images/dosirockLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { LoginRequest } from '../../types/loginTypes';
import axios from 'axios';
import SocialLogin from '../Login/SocialLogin';
import { toast } from 'react-toastify';

const Login: React.FC = () => {
  const [loginCheck, setLoginCheck] = useState<string | null>(null); // 로그인 실패 상태

  //useForm
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid, isSubmitted },
  } = useForm<LoginRequest>({ mode: 'onChange' });
  // console.log(watch);

  const navigate = useNavigate();

  // 로그인 로직
  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    try {
      const response = await axios.post(
        'https://api.dosirock.store/v1/users/login',
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
        toast.error('잘못된 값이 입력되었습니다.', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: { background: '#FFF4B8', color: 'black' },
        });
        console.log(loginCheck);
      } else if (response.status === 500) {
        //서버 내부 에러
        toast.error(
          '서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
          {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: { background: '#FFF4B8', color: 'black' },
          }
        );
        console.log(loginCheck);
      }
    } catch (error) {
      console.error('로그인 요청 중 에러 발생:', error);
      toast.error('오류가 발생했습니다. 다시 시도해 주세요.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { width: '340px', background: '#FFF4B8', color: 'black' },
      });
    }
  };

  return (
    <div>
      <div className='flex h-screen cursor-none flex-col items-center justify-center'>
        <Link to='/' className='cursor-none'>
          <img
            src={dosirockLogo}
            alt='Logo'
            className='mb-[28px] flex h-[73px] w-[200px] cursor-none'
          />
        </Link>

        {/* 여기서부터 제출 폼 */}
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className='w-[490px] cursor-none rounded-[28px] border border-border px-[43px] pb-[46px] pt-[40px]'
          autoComplete='off'
        >
          <div className='mb-[14px] cursor-none text-xl font-medium leading-10 text-main'>
            로그인
          </div>
          <div className='flex flex-col items-center'>
            <input
              {...register('id', {
                required: {
                  value: true,
                  message: '아이디를 입력해주세요',
                },
              })}
              aria-invalid={
                isSubmitted ? (errors.id ? 'true' : 'false') : undefined
              }
              type='text'
              placeholder='아이디'
              className='h-[60px] w-[410px] cursor-none rounded-[12px] border border-border px-[20px] py-[12px]'
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
              className='mt-[14px] h-[60px] w-[410px] cursor-none rounded-[12px] border px-[20px] py-[12px]'
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
                className={`mt-9 h-[60px] w-[410px] cursor-none rounded-[12px] border bg-primary text-center text-lg font-bold leading-[30px] text-white ${
                  !isValid || isSubmitting
                    ? 'opacity-50'
                    : 'hover:bg-primary-hover'
                }`}
              >
                로그인
              </button>
            </div>
          </div>
          <div className='mb-[12px] flex flex-col items-center'>
            <Link
              to='/join'
              className='/* var(--gray-300) mb-[18px] mt-[14px] h-[35px] w-[330px] cursor-none text-center text-base font-semibold leading-10 text-main'
            >
              회원가입
            </Link>
            <div className='h-[35px] w-[330px] text-center text-caption'>
              SNS계정으로 간편 로그인 / 회원가입
            </div>
          </div>
          <div className='flex flex-row justify-center'>
            <SocialLogin />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

//api/v1/users/login
