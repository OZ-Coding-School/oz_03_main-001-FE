import React, { useState } from 'react';
import { useJoinStore } from '../../store/useJoinStore';
import logo from '../../assets/images/dosirockLogo.png';
import Modal from './Modal/Modal';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Join = () => {
  // 페이지 이동을 위한 네비게이트
  const navigate = useNavigate();

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
    validateName,
    validateEmail,
    validateId,
    validatePassword,
    validateRePassword,
  } = useJoinStore();

  // 모달 상태 관리
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

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
          'https://api.dosirock.store/v1/users/singup',
          {
            username: nameValue,
            email: emailValue,
            id: idValue,
            password: passValue,
          }
        );

        // 성공하면 페이지 이동
        if (response.data.success) {
          navigate('/all');
        } else {
          // 중복된 이메일 또는 아이디에 대한 오류 처리
          if (
            response.data.includes('duplicate_email') &&
            response.data.includes('duplicate_username')
          ) {
            setEmailError('이미 사용 중인 이메일입니다.');
            setIdError('이미 사용 중인 아이디입니다.');
          } else if (response.data.includes('duplicate_email')) {
            setEmailError('이미 사용 중인 이메일입니다.');
          } else if (response.data.includes('duplicate_id')) {
            setIdError('이미 사용 중인 아이디입니다.');
          }
        }
      } catch (error) {
        console.error('에러 메세지 : ', error);
        setModalOpen(true);
        setModalMessage('서버 문제로 잠시 후 다시 시도해 주세요.');
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
        <div className='relative'>
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
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            {modalMessage}
          </Modal>
        </div>
      </form>
    </div>
  );
};

export default Join;
