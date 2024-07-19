import React from 'react'
import Logo from '../../assets/images/dosilockLogo.png'

const Header = () => {
  return (
    <header className='bg-white fixed top-0 left-0 right-0'>
        <div className='inner h-[75px] w-[1770px] mx-auto flex items-center justify-between '>
            <div className='flex items-center'>
                <h1><a href='#' aria-label='도시락도 락이다'><img src={Logo} aria-hidden className='w-[118px]'/></a></h1>
                <a href='#' className='ml-[58px] text-lg hover:text-primary font-medium'>주문하기</a>
                <a href='#' className='ml-[62px] text-lg hover:text-primary font-medium'>커뮤니티</a>
            </div>
            <button className='bg-border w-[85px] h-[38px] rounded-full font-medium'>로그인</button>
        </div>
    </header>
  )
}

export default Header;