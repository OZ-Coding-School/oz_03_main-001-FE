import { useEffect, useRef } from 'react';

const Bg01 = () => {
  const bg01PathRef = useRef<SVGPathElement | null>(null);
  const bg01OriginPath =
    'M208 9.99994C284.4 42.2829 501.253 -23.0881 554 41C593.223 88.6565 572.952 166.266 575.018 228.033C577.656 307.064 469.778 296.567 433.55 387.529C415.633 432.516 472.111 467.595 456.63 532.494C441.15 597.392 314.775 667.837 264.781 702.372C166.776 770.066 77.0583 774.794 6.66483 758.003C-63.7286 741.212 -133.391 657.655 -112.827 571.447C-92.2632 485.238 -15.9994 465.036 0.656477 402.738C11.7458 361.255 -43.0843 326.725 -44.2146 283.807C-45.5365 233.595 -31.8265 183.142 -6.26373 139.905C39.3997 62.6705 112.602 -30.3114 208 9.99994Z';
  const bg01ModPath =
    'M317.029 6.57403C393.429 38.857 361.929 168.323 414.676 232.411C453.899 280.067 572.952 258.266 575.018 320.033C577.656 399.064 469.778 388.567 433.55 479.529C415.633 524.516 472.111 559.595 456.63 624.494C441.15 689.392 314.775 759.837 264.781 794.372C166.776 862.066 77.0583 866.794 6.66484 850.003C-63.7286 833.212 -133.391 749.655 -112.827 663.447C-92.2631 577.238 -15.9994 557.036 0.656481 494.738C11.7458 453.255 -43.0844 418.725 -44.2146 375.807C-45.5365 325.595 -31.8265 275.142 -6.26374 231.905C39.3997 154.671 221.631 -33.7373 317.029 6.57403Z';
  const bg01AniDuration = 5000; // 애니메이션 지속 시간(밀리초)
  const bg01RestDuration = 5000; // 복원 애니메이션 지속 시간(밀리초)

  useEffect(() => {
    const animatePathBg01 = () => {
      if (bg01PathRef.current) {
        bg01PathRef.current.style.transition = `d ${bg01AniDuration}ms`;
        bg01PathRef.current.setAttribute('d', bg01ModPath);

        setTimeout(() => {
          if (bg01PathRef.current) {
            bg01PathRef.current.style.transition = `d ${bg01RestDuration}ms`;
            bg01PathRef.current.setAttribute('d', bg01OriginPath);

            setTimeout(() => {
              if (bg01PathRef.current) {
                bg01PathRef.current.style.transition = 'none';
                requestAnimationFrame(animatePathBg01);
              }
            }, bg01RestDuration);
          }
        }, bg01AniDuration);
      }
    };

    animatePathBg01();
  }, []);

  return (
    <div className='bg_01 absolute bottom-[-440px] left-0 animate-bg1_move'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='579'
        height='767'
        viewBox='0 0 579 767'
      >
        <path
          id='bg01'
          ref={bg01PathRef}
          d={bg01OriginPath}
          fill='#FFF4B8'
          opacity='0.3'
        />
      </svg>
    </div>
  );
};

export default Bg01;
