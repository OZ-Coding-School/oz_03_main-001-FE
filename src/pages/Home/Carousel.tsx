import React from 'react'
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll'
import image from '../../assets/images/example1.png'

const CarouselLi = () => {
    return (
    <li className="embla__slide pl-[40px] flex-none w-1/4">
        <div className='h-[474px] bg-white rounded-[28px] shadow-type1 border-[1px] border-border px-[20px]'>
            <div className="w-[398px] h-[392px] bg-[#fffadc] rounded-2xl mx-auto mt-[20px] flex items-center justify-center">
                <img src={image} alt='샘플 도시락 이미지' className='w-[50%]'/>
            </div>
            <a href='#' className='text-lg leading-[60px] pl-[5px]'>무슨무슨 도시락</a>
        </div>
    </li>
    )
}

const Carousel = () => {
    const autoplayOptions = {
        delay: 0, // 슬라이드 간 대기 시간 (밀리초)
        stopOnInteraction: false, // 사용자와의 상호작용 시 자동 재생 중지
    };

    const [emblaRef] = useEmblaCarousel({ loop: true }, [
        AutoScroll(autoplayOptions)
    ])

  return (
    <div className='slider embla overflow-hidden py-[30px] mt-[60px] border-2' ref={emblaRef}>
        <ul className="embla__container flex">
            <CarouselLi/>
            <CarouselLi/>
            <CarouselLi/>
            <CarouselLi/>
            <CarouselLi/>
        </ul>
    </div>
  )
}

export default Carousel
