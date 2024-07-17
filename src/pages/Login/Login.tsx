import React from 'react';
import dosilockLogo from '../../assets/images/dosilockLogo.png';
import googleLogo from '../../assets/images/googleLogo.png';
import kakaoLogo from '../../assets/images/kakaoLogo.png';
import naverLogo from '../../assets/images/naverLogo.png';

const Login: React.FC = () => {
  return (
    <div>
      <div className='flex h-screen flex-col items-center justify-center'>
        <img
          src={dosilockLogo}
          alt='Logo'
          className='mb-[28px] flex h-[73px] w-[200px]'
        />

        {/* 여기서부터 제출 폼 */}
        <form className='h-[533px] w-[490px] rounded-[28px] border border-border'>
          <div className='mb-[14px] ml-[43px] mt-[39px] text-xl font-medium leading-10 text-[#333333]'>
            로그인
          </div>
          <div className='flex flex-col items-center'>
            <label></label>
            <input
              type='text'
              placeholder='아이디'
              className='h-[60px] w-[410px] rounded-[12px] border px-4 py-2'
              style={{ border: ' 1px solid #E6E6E6' }}
            />
            <label></label>
            <input
              type='password'
              placeholder='비밀번호'
              className='mt-[14px] h-[60px] w-[410px] rounded-[12px] border px-4 py-2'
              style={{ border: ' 1px solid #E6E6E6' }}
            />
            <label></label>
            <input
              type='submit'
              value='로그인'
              className='mt-[35px] h-[60px] w-[410px] rounded-[12px] border bg-[#EC6446] text-center text-lg font-bold leading-[30px] text-white'
              style={{ border: ' 1px solid #EC6446' }}
            />
          </div>
          <div className='mb-[12px] flex flex-col items-center'>
            <div className='text-[#333333]font-semibold mb-[18px] mt-[14px] h-[35px] w-[330px] text-center text-base leading-10'>
              회원가입
            </div>
            <div className='h-[35px] w-[330px] text-center text-[#6F6F6F]'>
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
