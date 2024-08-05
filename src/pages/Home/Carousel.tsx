import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import image1 from '../../assets/images/sample1.png';
import image2 from '../../assets/images/sample2.png';
import image3 from '../../assets/images/sample3.png';
import image4 from '../../assets/images/sample4.png';
import { Link } from 'react-router-dom';

const CarouselLi = ({ title, image }: { title: string; image: string }) => {
  return (
    <li className='embla__slide w-1/4 flex-none pl-[40px]'>
      <div className='shadow-type1 h-[474px] rounded-[28px] border-[1px] border-border bg-white px-[20px]'>
        <div className='mx-auto mt-[20px] flex h-[392px] items-center justify-center rounded-2xl bg-[#fffadc]'>
          <img src={image} alt={title} className='w-[70%] max-w-[230px]' />
        </div>
        <Link to={''} className='pl-[5px] text-lg leading-[60px]'>
          {title}
        </Link>
      </div>
    </li>
  );
};

const carouselData = [
  { title: '리액트 튀김 도시락', image: image1 },
  { title: '노드말이 도시락', image: image2 },
  { title: '깃허브 닭고기 도시락', image: image3 },
  { title: 'sql 돌고래고기 도시락', image: image4 },
  { title: '도커 고래고기 도시락', image: image1 },
  { title: '장고 장조림 도시락', image: image2 },
  // 더 많은 항목 추가
];

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
        {carouselData.map((item, index) => (
          <CarouselLi key={index} title={item.title} image={item.image} />
        ))}
      </ul>
    </div>
  );
};

export default Carousel;
