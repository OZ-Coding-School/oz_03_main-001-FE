/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useJoinStore } from '../../store/useJoinStore';
import logo from '../../assets/images/dosirockLogo.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Join = () => {
  // 페이지 이동을 위한 네비게이트
  const navigate = useNavigate();

  // 페이지가 마운트될 때 폼 상태를 초기화
  useEffect(() => {
    // 컴포넌트가 마운트될 때 상태를 초기화
    resetState();
  }, []);

  // useJoinStore를 통해 필요한 상태와 상태 업데이트 함수들을 가져오기
  const {
    nameValue,
    emailValue,
    idValue,
    passValue,
    rePassValue,
    nameError,
    emailError,
    idError,
    passError,
    rePassError,
    setNameValue,
    setEmailValue,
    setIdValue,
    setPassValue,
    setRePassValue,
    setEmailError,
    setIdError,
    setPassError,
    validateName,
    validateEmail,
    validateId,
    validatePassword,
    validateRePassword,
    resetState,
  } = useJoinStore();

  // 버튼 색 변화를 위해 값이 비어있는지 확인을 위한 변수
  const isValueEmpty =
    nameValue && emailValue && idValue && passValue && rePassValue;

  // 회원가입 하기 버튼 클릭시 실행되는 함수
  const postJoin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // 새로고침 방지
    e.preventDefault();

    // 유효성 검사 결과 불린 값으로 받기
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isIdValid = validateId();
    const isPasswordValid = validatePassword();
    const isRePasswordValid = validateRePassword();

    // 유효성 검사를 모두 통과하면
    if (
      isNameValid &&
      isEmailValid &&
      isIdValid &&
      isPasswordValid &&
      isRePasswordValid
    ) {
      //서버에 포스트 시도
      try {
        const response = await axios.post(
          'https://api.dosirock.store/v1/users/signup/',
          {
            username: idValue,
            nickname: nameValue,
            email: emailValue,
            password: passValue,
          }
        );
        console.log('회원가입 성공');
        // 액세스 토큰을 세션에 저장하는 함수
        const accessToken = response.data.access_token;
        sessionStorage.setItem('accessToken', accessToken);

        navigate('/all');

        // if (response.status === 200) {
        //   console.log('회원가입 성공');
        //   // 액세스 토큰을 세션에 저장하는 함수
        //   const accessToken = response.data.access_token;
        //   sessionStorage.setItem('accessToken', accessToken);

        //   navigate('/all');
        // } else if (response.status === 400) {
        //   const errorMessage = response.data.error_message;
        //   // 첫 번째 마침표까지 자르기
        //   const truncatedMessage = errorMessage.split('.')[0] + '.';
        //   toast.error(truncatedMessage, {
        //     position: 'top-center',
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     style: { background: '#FFF4B8', color: 'black' },
        //   });
        // }
      } catch (error) {
        console.log(error);

        if (axios.isAxiosError(error) && error.response) {
          const { data } = error.response;
          const errorMessage = data.error_message;
          // 첫 번째 마침표까지 자르기
          const truncatedMessage = errorMessage.split('.')[0] + '.';

          if (truncatedMessage.includes('이메일')) {
            toast.error(truncatedMessage, {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              style: { background: '#FFF4B8', color: 'black' },
            });
            setEmailError(' ');
          } else if (truncatedMessage.includes('아이디')) {
            toast.error(truncatedMessage, {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              style: { background: '#FFF4B8', color: 'black' },
            });
            setIdError(' ');
          } else if (truncatedMessage.includes('비밀번호')) {
            toast.error(truncatedMessage, {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              style: { background: '#FFF4B8', color: 'black' },
            });
            setPassError(' ');
          }
        } else {
          toast.error('서버 문제로 잠시 후 다시 시도해 주세요!', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: { width: '330px', background: '#FFF4B8', color: 'black' },
          });
        }
      }
    }
  };
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-7'>
      <div>
        <Link to='/'>
          <img className='h-[73px] w-[200px]' src={logo} alt='로고' />
        </Link>
      </div>
      <form className='w-[490px] rounded-[28px] border border-border px-[40px] pb-[46px] pt-[40px]'>
        <span className='text-xl font-medium leading-10 text-main'>
          회원가입
        </span>
        <div className='flex flex-col gap-[14px] pb-[35px] pt-[21px]'>
          <div>
            <input
              id='name-input'
              className={`h-[60px] w-[410px] cursor-none rounded-xl border px-[20px] py-[12px] ${nameError ? 'border-primary' : 'border-border'}`}
              type='text'
              placeholder='이름'
              defaultValue=''
              value={nameValue}
              onChange={(e) => {
                setNameValue(e.target.value);
                validateName();
              }}
            ></input>
            {nameError && (
              <span className='pl-[15px] text-xs font-medium text-primary-hover'>
                {nameError}
              </span>
            )}
          </div>
          <div>
            <input
              id='email-input'
              className={`h-[60px] w-[410px] cursor-none rounded-xl border px-[20px] py-[12px] ${emailError ? 'border-primary' : 'border-border'}`}
              type='email'
              placeholder='이메일'
              defaultValue=''
              value={emailValue}
              onChange={(e) => {
                setEmailValue(e.target.value);
                validateEmail();
              }}
            ></input>
            {emailError && (
              <span className='pl-[15px] text-xs font-medium text-primary'>
                {emailError}
              </span>
            )}
          </div>
          <div>
            <input
              id='id-input'
              className={`h-[60px] w-[410px] cursor-none rounded-xl border px-[20px] py-[12px] ${idError ? 'border-primary' : 'border-border'}`}
              type='text'
              placeholder='아이디'
              defaultValue=''
              value={idValue}
              onChange={(e) => {
                setIdValue(e.target.value);
                validateId();
              }}
            ></input>
            {idError && (
              <span className='pl-[15px] text-xs font-medium text-primary'>
                {idError}
              </span>
            )}
          </div>
          <div>
            <input
              id='password-input'
              className={`h-[60px] w-[410px] cursor-none rounded-xl border px-[20px] py-[12px] ${passError ? 'border-primary' : 'border-border'}`}
              type='password'
              placeholder='비밀번호'
              defaultValue=''
              value={passValue}
              onChange={(e) => {
                setPassValue(e.target.value);
                validatePassword();
              }}
            ></input>
            {passError && (
              <span className='pl-[15px] text-xs font-medium text-primary'>
                {passError}
              </span>
            )}
          </div>
          <div>
            <input
              id='re-password-input'
              className={`h-[60px] w-[410px] cursor-none rounded-xl border px-[20px] py-[12px] ${rePassError ? 'border-primary' : 'border-border'}`}
              type='password'
              placeholder='비밀번호 확인'
              defaultValue=''
              value={rePassValue}
              onChange={(e) => {
                setRePassValue(e.target.value);
                validateRePassword();
              }}
            ></input>
            {rePassError && (
              <span className='pl-[15px] text-xs font-medium text-primary'>
                {rePassError}
              </span>
            )}
          </div>
        </div>
        <button
          id='submit-button'
          className={`h-[60px] w-[410px] cursor-none rounded-xl border border-border px-[20px] py-[12px] text-lg font-bold text-white ${
            isValueEmpty ? 'bg-primary hover:bg-primary-hover' : 'bg-disabled'
          }`}
          type='submit'
          onClick={postJoin}
        >
          회원가입 하기
        </button>
      </form>
    </div>
  );
};

export default Join;
