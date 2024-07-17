import React from 'react';
import { useJoinStore } from '../../store/useJoinStore';
import logo from '../../assets/images/dosilockLogo.png';

const Join = () => {
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
    idRegex: /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/,
    pwRegex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/,
  };

  const regexsName = (value: string) => {
    if (!value) {
      setNameError('이름을 입력해 주세요');
      return false;
    } else {
      setNameError('');
      return true;
    }
  };

  const regexsEmail = (value: string) => {
    if (!regexs.emailRegex.test(value)) {
      setEmailError('유효한 이메일 주소를 입력해 주세요');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const regexsId = (value: string) => {
    if (!regexs.idRegex.test(value)) {
      setIdError('유효한 아이디를 입력해 주세요');
      return false;
    } else {
      setIdError('');
      return true;
    }
  };

  const regexsPassword = (value: string) => {
    if (!regexs.pwRegex.test(value)) {
      setPassError('유효한 비밀번호를 입력해 주세요');
      return false;
    } else {
      setPassError('');
      return true;
    }
  };

  const regexsRePassword = (value: string, rePass: string) => {
    if (value !== rePass) {
      setRePassError('비밀번호가 일치하지 않습니다');
      return false;
    } else {
      setRePassError('');
      return true;
    }
  };

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

  const postJoin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (
      regexsName(nameValue) &&
      regexsEmail(emailValue) &&
      regexsId(idValue) &&
      regexsPassword(passValue) &&
      regexsRePassword(passValue, rePassValue)
    ) {
      alert('회원가입 성공');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center gap-7 pt-[114px]'>
      <div>
        <img className='h-[73px] w-[200px]' src={logo} alt='로고' />
      </div>
      <form className='h-[598px] w-[490px] rounded-[28px] border border-border px-[40px] pb-[46px] pt-[40px]'>
        <span className='text-xl font-medium leading-10 text-main'>
          회원가입
        </span>
        <div className='flex flex-col gap-[14px] pb-[35px] pt-[21px]'>
          <div>
            <input
              className={`h-[60px] w-[410px] rounded-xl border px-[20px] py-[12px] ${nameError ? 'border-primary' : 'border-border'}`}
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
              className={`h-[60px] w-[410px] rounded-xl border px-[20px] py-[12px] ${emailError ? 'border-primary' : 'border-border'}`}
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
              className={`h-[60px] w-[410px] rounded-xl border px-[20px] py-[12px] ${idError ? 'border-primary' : 'border-border'}`}
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
              className={`h-[60px] w-[410px] rounded-xl border px-[20px] py-[12px] ${passError ? 'border-primary' : 'border-border'}`}
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
              className={`h-[60px] w-[410px] rounded-xl border px-[20px] py-[12px] ${rePassError ? 'border-primary' : 'border-border'}`}
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
        <button
          className={`h-[60px] w-[410px] rounded-xl border border-border px-[20px] py-[12px] text-lg font-bold text-white ${
            isValueEmpty
              ? 'bg-primary hover:bg-primary-hover'
              : 'bg-gray20 hover:bg-gray30'
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
