import React, { useState } from 'react';
import { useJoinStore } from '../../store/useJoinStore';
import logo from '../../assets/images/dosirockLogo.png';
import Modal from './Modal/Modal';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Join = () => {
  // 페이지 이동을 위한 네비게이트
  const navigate = useNavigate();

  // useJoinStore를 통해 필요한 상태와 상태 업데이트 함수들을 가져옵니다.
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
    setNameError,
    setEmailError,
    setIdError,
    setPassError,
    setRePassError,
  } = useJoinStore();

  // 버튼 색 변화를 위해 값이 비어있는지 확인을 위한 변수
  const isValueEmpty =
    nameValue && emailValue && idValue && passValue && rePassValue;

  // 이메일, 아이디, 패스워드 정규표현식
  const regexs = {
    emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    idRegex: /^[a-zA-Z][a-zA-Z0-9_-]{4,19}$/,
    pwRegex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/,
  };

  // 이름 검사
  const regexsName = (value: string) => {
    if (!value) {
      setNameError('이름을 입력해 주세요');
      return false;
    } else {
      setNameError('');
      return true;
    }
  };

  // 이메일 검사
  const regexsEmail = (value: string) => {
    if (!regexs.emailRegex.test(value)) {
      setEmailError('올바른 이메일 주소를 입력해 주세요');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  // 아이디 검사
  const regexsId = (value: string) => {
    if (!/^[a-zA-Z]/.test(value)) {
      setIdError('아이디의 첫 글자는 알파벳으로 입력해 주세요');
    } else if (!regexs.idRegex.test(value)) {
      setIdError(
        '알파벳, 숫자, 밑줄(_), 대시(-), 사용하여 5자 이상 13자 이하로 입력해 주세요'
      );
      return false;
    } else {
      setIdError('');
      return true;
    }
  };

  // 비번 검사
  const regexsPassword = (value: string) => {
    if (value.length < 8) {
      setPassError('최소 8자 이상 입력해 주세요');
    } else if (!regexs.pwRegex.test(value)) {
      setPassError(
        '숫자, 소문자, 대문자, 특수문자를 각각 최소 하나 이상 포함하여 입력해 주세요'
      );
      return false;
    } else {
      setPassError('');
      return true;
    }
  };

  // 비번 확인 검사
  const regexsRePassword = (value: string, rePass: string) => {
    if (value !== rePass) {
      setRePassError('비밀번호가 일치하지 않습니다');
      return false;
    } else {
      setRePassError('');
      return true;
    }
  };

  // 각 인풋 벨류들 온체인지
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
    regexsName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
    regexsEmail(e.target.value);
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdValue(e.target.value);
    regexsId(e.target.value);
  };

  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassValue(e.target.value);
    regexsPassword(e.target.value);
  };

  const handleRePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRePassValue(e.target.value);
    regexsRePassword(passValue, e.target.value);
  };

  // 모달 상태 관리
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // 회원가입 하기 버튼 클릭시 실행되는 함수
  const postJoin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // 새로고침 방지
    e.preventDefault();

    // 유효성 검사를 모두 마치면
    if (
      regexsName(nameValue) &&
      regexsEmail(emailValue) &&
      regexsId(idValue) &&
      regexsPassword(passValue) &&
      regexsRePassword(passValue, rePassValue)
    ) {
      //서버에 포스트 시도
      try {
        const response = await axios.post(
          'http://api.dosirock.store/v1/users/singup',
          {
            username: nameValue,
            email: emailValue,
            id: idValue,
            password: passValue,
          }
        );

        // 성공하면 알레르기로 페이지 이동
        if (response.data.success) {
          // 응답 데이터 성공 시 알러지 페이지로 이동
          navigate('/all');
        } else {
          // 중복된 이메일 또는 아이디에 대한 오류 처리
          // 둘 다 문제
          if (response.data === 'duplicate_email' && 'duplicate_username') {
            setEmailError('이미 사용 중인 이메일입니다.');
            setIdError('이미 사용 중인 아이디입니다.');

            // 이메일만 문제
          } else if (response.data === 'duplicate_email') {
            setEmailError('이미 사용 중인 이메일입니다.');

            // 아이디 문제
          } else if (response.data === 'duplicate_id') {
            setIdError('이미 사용 중인 아이디입니다.');
          }
        }
        // 에러가 발생하면 에러 문구 모달창 띄우기
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
        <Link to={'/'}>
          <img className='h-[73px] w-[200px]' src={logo} alt='로고' />{' '}
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
              onChange={handleNameChange}
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
              onChange={handleEmailChange}
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
              onChange={handleIdChange}
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
              onChange={handlePassChange}
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
              onChange={handleRePassChange}
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
