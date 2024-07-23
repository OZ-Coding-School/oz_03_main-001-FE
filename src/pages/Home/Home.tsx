import { motion, Variants } from 'framer-motion';
import mainTxt from '../../assets/images/mainTxt.png';
import character from '../../assets/images/character.png';
import truck from '../../assets/images/truck.png';
import munuh from '../../assets/images/munuh-profile.png';
import tigim from '../../assets/images/tigim-profile.png';
import kori from '../../assets/images/kori-profile.png';

import './customClass.css';
import Carousel from './Carousel';
import Footer from '../../components/layout/Footer';
import Bg01 from './bgAnimation/Bg01';
import Bg02 from './bgAnimation/Bg02';
import Bg03 from './bgAnimation/Bg03';

const Home = () => {
  const motionSettings = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: {
      ease: 'easeInOut',
      duration: 0.8,
    },
  };

  const cardVariants: Variants = {
    offscreen: {
      opacity: 0,
      y: 50,
      // rotateY: 180,
    },
    onscreen: {
      opacity: 1,
      y: 0,
      // rotateY: 360,
      transition: {
        type: 'spring',
        bounce: 0.5,
        duration: 0.8,
      },
    },
  };

  const motionLiSettings = {
    className: 'card-container',
    initial: 'offscreen',
    whileInView: 'onscreen',
    viewport: { once: true, amount: 0.8 },
    variants: cardVariants,
  };

  return (
    <section>
      <button className='group fixed bottom-[65px] left-1/2 z-40 flex h-[60px] w-[275px] -translate-x-1/2 transform items-center rounded-full bg-white shadow-btn hover:bg-tigim'>
        <div className='mx-auto flex items-center'>
          <span className='mr-[25px] text-lg font-medium group-hover:text-white'>
            나만의 도시락 만들러 가기
          </span>
          <svg
            width='8'
            height='15'
            viewBox='0 0 8 15'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M1.5 1.21771L7 7.53087L1.5 13.844'
              stroke='#333333'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              className='group-hover-stroke-white'
            />
          </svg>
        </div>
      </button>

      {/* article1 - main banner */}
      <article className='h-custom relative overflow-hidden bg-white'>
        <motion.div {...motionSettings}>
          <div className='inner mx-auto flex w-[1590px] justify-between pt-[150px]'>
            <div className='z-10'>
              <h2 className='mb-[26px]'>
                <img src={mainTxt} alt='도시락도 ROCK이다!' />
              </h2>
              <p className='mb-[80px] text-[30px] font-medium'>
                나만의 &lsquo;맛&rsquo; 으로, 커스터마이즈의 즐거움을 경험해
                보세요.
              </p>
              <p className='text-[20px] font-medium leading-10'>
                매일 같은 도시락이 주는 지루함을 바꿀 준비 되셨나요?
                <br />
                <span className='bg-secondary p-1 font-bold'>
                  당신의 취향과 영양에 맞춰 특별히 제작된 도시락
                </span>
                으로,
                <br />
                하루를 즐거움으로 가득 채워보세요!
              </p>
            </div>

            <img src={character} aria-hidden />
          </div>
        </motion.div>
        <Bg01 />
      </article>
      {/* article2 */}
      <article className='bg-primary'>
        <div className='inner mx-auto mb-[330px] w-[1590px] pt-[112px]'>
          <motion.div {...motionSettings}>
            <div className='mb-[190px] text-center'>
              <p className='mb-[40px] text-[20px] font-medium text-secondary'>
                메뉴 선택도 A TO Z
              </p>
              <h3 className='text-[35px] font-semibold text-white'>
                &ldquo;밥食으로 만드는 나만의 맛있는 이야기, 도시락&rdquo;
              </h3>
            </div>
          </motion.div>
          <motion.div {...motionSettings}>
            <div className='flex items-center'>
              <div className='preView border-black h-[485px] w-[864px] rounded-[19px] border-4 bg-white'></div>
              <p className='ml-[60px] text-[20px] leading-10 text-white'>
                도시락도 락이다는 당신만을 위한{' '}
                <span className='text-secondary'>맞춤 도시락 서비스</span>
                입니다.
                <br />
                저희는 바쁜 현대인의 일상속에서 건강과 맛을 동시에 챙기고
                <br />
                개인의 알레르기 여부를 반영하여 완벽한 도시락을 제공합니다.
                <br />
                이제는 저희 서비스를 통해{' '}
                <span className='text-secondary'>
                  간편하게 주문하고 나만의 도시락
                </span>
                을 받아보세요.
                <br />
                도시락 하나로 매일 새로운 즐거움을 느끼는 하루를 시작 하실 수
                있습니다.
              </p>
            </div>
          </motion.div>
        </div>
        <motion.div {...motionSettings}>
          <div className='relative flex items-center pb-[270px]'>
            <div className='inner mx-auto w-[1590px]'>
              <p className='text-[20px] leading-10 text-white'>
                바쁜 일상 속에서도 건강하고 신선한 식사를 놓치지 마세요!
                <br />
                저희만의 <span className='text-secondary'>새벽배송</span>{' '}
                서비스로 이른 새벽, 신선한 재료로 만든 나만의 커스텀 도시락이
                출근 전에 도착합니다.
                <br />
                가벼운 클릭 한번으로{' '}
                <span className='text-secondary'>새벽의 신선함</span>을 담은
                도시락을 내일 아침{' '}
                <span className='text-secondary'>당신의 식탁</span>에서 받아보실
                수 있습니다.
                <br />
                빠른 배송과 간편함이 당신의 바쁜 하루에 여유를 선사할 것입니다.
                <br />
                지금 주문하시고 하루의 시작을 더 특별하게 만들어 보세요!
              </p>
            </div>
            <div className='absolute left-1/2 h-full w-[1920px] translate-x-[-50%]'>
              <img className='absolute right-0' src={truck} aria-hidden />
            </div>
          </div>
        </motion.div>
      </article>
      {/* article3 */}
      <article className='relative overflow-hidden'>
        <motion.div {...motionSettings}>
          <div className='inner mx-auto w-[1590px] pt-[200px]'>
            <div className='text-center'>
              <span className='mx-auto mb-[30px] block h-[9px] w-[60px] rounded-full bg-secondary' />
              <h4 className='mb-[37px] text-3xl font-semibold'>
                오늘의 인기 도시락
              </h4>
              <p className='text-xl'>오늘 가장 인기있는 도시락입니다.</p>
            </div>
          </div>
          <Carousel />
        </motion.div>
        <div className='inner mx-auto mb-[200px] w-[1590px] pt-[200px]'>
          <motion.div {...motionSettings}>
            <div className='mb-[120px] text-center'>
              <span className='mx-auto mb-[30px] block h-[9px] w-[60px] rounded-full bg-secondary' />
              <h4 className='mb-[37px] text-3xl font-semibold'>
                도시락도 락이다와 함께한 후기
              </h4>
              <p className='text-xl'>고객님들의 생생한 후기를 만나보세요!</p>
            </div>
          </motion.div>
          <div className='mx-auto flex w-[1435px] justify-between'>
            <ul>
              <motion.li {...motionLiSettings}>
                <div className='mb-[45px] flex h-[245px] w-[660px] items-center justify-center rounded-[18px] bg-secondary bg-opacity-30 backdrop-blur-[50px]'>
                  <div className='flex w-full items-center'>
                    <div className='w-[175px] text-center'>
                      <img
                        src={munuh}
                        className='mx-auto mb-[30px]'
                        aria-hidden
                        alt=''
                      />
                      <span className='text-lg'>
                        <b className='text-xl font-semibold'>노*인</b>님
                      </span>
                    </div>
                    <p className='text-lg'>
                      제가 다이어트를 하느라고 시중에 있는 도시락은 맘에 안들고
                      <br />
                      그렇다고 샐러드만 먹기에는 양에 안차는 느낌이었는데
                      <br />
                      칼로리 낮은 반찬들만 담아서 주문하니까
                      <br />
                      편리하고 다이어트에도 효과본것같아욤.
                    </p>
                  </div>
                </div>
              </motion.li>
              <motion.li {...motionLiSettings}>
                <div className='mb-[45px] flex h-[245px] w-[660px] items-center justify-center rounded-[18px] bg-secondary bg-opacity-30 backdrop-blur-[50px]'>
                  <div className='flex w-full items-center'>
                    <div className='w-[175px] text-center'>
                      <img
                        src={kori}
                        className='mx-auto mb-[30px]'
                        aria-hidden
                        alt=''
                      />
                      <span className='text-lg'>
                        <b className='text-xl font-semibold'>조*재</b>님
                      </span>
                    </div>
                    <p className='text-lg'>
                      저같은 경우에는 전생에 육식공룡인가 싶을정도로
                      <br />
                      고기가 아니면 식사를 안한다 주의였는데
                      <br />
                      도시락도 락이다 에서 제가 좋아하는 고기 메뉴만
                      <br />
                      가득 담아서 주문할 수 있어서 좋아요.
                    </p>
                  </div>
                </div>
              </motion.li>
              <motion.li {...motionLiSettings}>
                <div className='mb-[45px] flex h-[245px] w-[660px] items-center justify-center rounded-[18px] bg-secondary bg-opacity-30 backdrop-blur-[50px]'>
                  <div className='flex w-full items-center'>
                    <div className='w-[175px] text-center'>
                      <img
                        src={tigim}
                        className='mx-auto mb-[30px]'
                        aria-hidden
                        alt=''
                      />
                      <span className='text-lg'>
                        <b className='text-xl font-semibold'>박*웅</b>님
                      </span>
                    </div>
                    <p className='text-lg'>
                      알레르기가 많아서 ... 매번 알레르기 유발음식이 있는지
                      없는지
                      <br />
                      확인하느라 스트레스 받고 신경쓰였는데
                      <br />
                      여기서는 제 알레르기 음식 제외하고 주문시킬 수 있어서
                      <br />
                      안심되고 좋습니다. 또 시켜먹을게요.
                    </p>
                  </div>
                </div>
              </motion.li>
            </ul>
            <ul className='mt-[85px]'>
              <motion.li {...motionLiSettings}>
                <div className='mb-[45px] flex h-[245px] w-[660px] items-center justify-center rounded-[18px] bg-secondary bg-opacity-30 backdrop-blur-[50px]'>
                  <div className='flex w-full items-center'>
                    <div className='w-[175px] text-center'>
                      <img
                        src={tigim}
                        className='mx-auto mb-[30px]'
                        aria-hidden
                        alt=''
                      />
                      <span className='text-lg'>
                        <b className='text-xl font-semibold'>이*주</b>님
                      </span>
                    </div>
                    <p className='text-lg'>
                      자취를 하다보니 매번 배달음식이나 시리얼같은것만 먹다가
                      <br />
                      밥다운 밥을 먹어야할것같아서 주문해봤어요.
                      <br />
                      제가 원하는 구성대로 시켜먹을 수 있어서 너무 좋아요!
                      <br />
                      배송도 빠르고 좋았어요!
                      <br />
                      앞으로도 자주 시켜먹을것 같아요.
                    </p>
                  </div>
                </div>
              </motion.li>
              <motion.li {...motionLiSettings}>
                <div className='mb-[45px] flex h-[245px] w-[660px] items-center justify-center rounded-[18px] bg-secondary bg-opacity-30 backdrop-blur-[50px]'>
                  <div className='flex w-full items-center'>
                    <div className='w-[175px] text-center'>
                      <img
                        src={munuh}
                        className='mx-auto mb-[30px]'
                        aria-hidden
                        alt=''
                      />
                      <span className='text-lg'>
                        <b className='text-xl font-semibold'>이*성</b>님
                      </span>
                    </div>
                    <p className='text-lg'>
                      동물을 너무 사랑해서 비건을 시작했습니다.
                      <br />
                      그래서 알아보던 도중 도시락도 락이다에서는 <br />
                      제가 원하는 메뉴들로만 도시락을 구성할 수 있다는걸 <br />
                      알게되어 주문해봤는데 앞으로도 종종 시켜먹을것같네요.{' '}
                      <br />
                      감사합니다. ^^
                    </p>
                  </div>
                </div>
              </motion.li>
              <motion.li {...motionLiSettings}>
                <div className='mb-[45px] flex h-[245px] w-[660px] items-center justify-center rounded-[18px] bg-secondary bg-opacity-30 backdrop-blur-[50px]'>
                  <div className='flex w-full items-center'>
                    <div className='w-[175px] text-center'>
                      <img
                        src={kori}
                        className='mx-auto mb-[30px]'
                        aria-hidden
                        alt=''
                      />
                      <span className='text-lg'>
                        <b className='text-xl font-semibold'>홍*빈</b>님
                      </span>
                    </div>
                    <p className='text-lg'>
                      이제 편의점의 모든 도시락을 다 섭렵했습니다.
                      <br />
                      매번 먹던 도시락 먹고 또 먹는 중 이였는데
                      <br />
                      저만의 도시락을 만들어 먹을 수 있다니.. <br />
                      신박해서 한번 시켜봤는데 좋네요 : &#41;
                      <br />
                      이제 매일 새로운 구성으로 질림 없이 밥을 먹고있습니다.{' '}
                      <br />
                      저와 같은 분들이 계시다면 진심 추천입니다
                    </p>
                  </div>
                </div>
              </motion.li>
            </ul>
          </div>
        </div>
        <Bg02 />
        <Bg03 />
        <Footer />
      </article>
    </section>
  );
};

export default Home;
