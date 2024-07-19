import React from 'react'
import Logo from '../../assets/images/dosilockLogo.png'
import footerBack from '../../assets/images/character-footer.png'

const Footer = () => {
  return (
    <footer className="bg-[url('./assets/images/character-footer.png')] bg-no-repeat bg-right-bottom">
      <div className='w-[1590px] mx-auto border-t-[1px] border-t-border'>
        <div className='mt-[47px] flex items-center'>
            <a href='#' aria-label="도시락도 락이다 홈"><img src={Logo} aria-hidden className='w-[120px]'/></a>
            <span className="w-0.5 h-[17px] bg-gray20 ml-[30px]" />
            <a href="#" className='w-[113px] text-center text-caption'>주문하기</a>
            <span className="w-0.5 h-[17px] bg-gray20" />
            <a href="#" className='w-[113px] text-center text-caption'>커뮤니티</a>
            <span className="w-0.5 h-[17px] bg-gray20" />
        </div>

        <div className='flex mt-[30px]'>
            <ul>
                <li className='text-caption mb-[5px] text-[15px]'>상호명 : 도시락도 락이다</li>
                <li className='text-caption mb-[5px] text-[15px]'>사업자등록번호 : 123-45-67890</li>
                <li className='text-caption mb-[5px] text-[15px]'>통신판매업 신고번호 : 2024-서울대구부산-1234호</li>
                <li className='text-caption mb-[5px] text-[15px]'>대표 : 이현주</li>
                <li className='text-caption mb-[5px] text-[15px]'>주소 : 사랑시 고백구 행복동 1동 234호</li>
            </ul>
            <ul className='ml-[185px]'>
                <li className='text-caption mb-[5px] text-[15px]'>이메일 : noemail@email.com</li>
                <li className='text-caption mb-[5px] text-[15px]'>전화 : 123-456-7890</li>
                <li className='text-caption mb-[5px] text-[15px]'>상담시간 : 평일 11시 - 17시 (공휴일 휴무)</li>
            </ul>
        </div>
        <p className='mt-[30px] text-caption text-[15px] pb-[50px]'>본 페이지는 상업적 목적이 아닌 포트폴리오용으로 제작되었습니다.</p>
      </div>
    </footer>
  )
}

export default Footer
