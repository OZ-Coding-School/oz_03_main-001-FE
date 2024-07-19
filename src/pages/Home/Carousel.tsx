import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import image from '../../assets/images/example1.png';

const CarouselLi = () => {
  return (
    <li className='embla__slide w-1/4 flex-none pl-[40px]'>
      <div className='shadow-type1 h-[474px] rounded-[28px] border-[1px] border-border bg-white px-[20px]'>
        <div className='mx-auto mt-[20px] flex h-[392px] w-[398px] items-center justify-center rounded-2xl bg-[#fffadc]'>
          <img src={image} alt='샘플 도시락 이미지' className='w-[50%]' />
        </div>
        <a href='#' className='pl-[5px] text-lg leading-[60px]'>
          무슨무슨 도시락
        </a>
      </div>
    </li>
  );
};

const Carousel = () => {
  const autoplayOptions = {
    delay: 0, // 슬라이드 간 대기 시간 (밀리초)
    stopOnInteraction: false, // 사용자와의 상호작용 시 자동 재생 중지
  };

  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    AutoScroll(autoplayOptions),
  ]);

  return (
    <div
      className='slider embla mt-[60px] overflow-hidden py-[30px]'
      ref={emblaRef}
    >
      <ul className='embla__container flex'>
        <CarouselLi />
        <CarouselLi />
        <CarouselLi />
        <CarouselLi />
        <CarouselLi />
      </ul>
    </div>
  );
};

export default Carousel;
