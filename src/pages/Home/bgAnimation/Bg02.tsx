import { useEffect, useRef } from 'react';

const Bg02 = () => {
  const Bg02PathRef = useRef<SVGPathElement | null>(null);
  const Bg02OriginPath =
    'M109.424 641.586C203.022 508.933 222.772 457.082 233.286 316.379C248.926 107.472 413.797 -77.2734 643.1 33.2259C819.451 118.222 958.109 313.055 957.085 474.426C955.371 746.165 727.965 1048.03 468.46 1129.29C244.751 1199.35 29.942 1093.72 2.00317 899.91C-7.47364 834.175 19.773 768.638 109.424 641.586Z';
  const Bg02ModPath =
    'M64.7431 578.5C158.341 445.847 187.612 416.925 243.03 313.878C337.03 139.089 423.541 -79.7736 652.843 30.7257C829.194 115.722 967.852 310.555 966.828 471.926C965.114 743.665 737.708 1045.53 478.204 1126.79C254.494 1196.85 39.6851 1091.22 11.7463 897.409C2.26949 831.675 -24.9083 705.552 64.7431 578.5Z';
  const Bg02AniDuration = 5000; // 애니메이션 지속 시간(밀리초)
  const Bg02RestDuration = 5000; // 복원 애니메이션 지속 시간(밀리초)

  useEffect(() => {
    const animatePathBg02 = () => {
      if (Bg02PathRef.current) {
        Bg02PathRef.current.style.transition = `d ${Bg02AniDuration}ms`;
        Bg02PathRef.current.setAttribute('d', Bg02ModPath);

        setTimeout(() => {
          if (Bg02PathRef.current) {
            Bg02PathRef.current.style.transition = `d ${Bg02RestDuration}ms`;
            Bg02PathRef.current.setAttribute('d', Bg02OriginPath);

            setTimeout(() => {
              if (Bg02PathRef.current) {
                Bg02PathRef.current.style.transition = 'none';
                requestAnimationFrame(animatePathBg02);
              }
            }, Bg02RestDuration);
          }
        }, Bg02AniDuration);
      }
    };

    animatePathBg02();
  }, []);

  return (
    <div className='bg-02 absolute right-[-100px] top-[300px] -z-10 animate-bg2_move'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='958'
        height='1151'
        viewBox='0 0 958 1151'
      >
        <path
          id='Bg02'
          ref={Bg02PathRef}
          d={Bg02OriginPath}
          fill='#EC6446'
          fillOpacity='0.05'
        />
      </svg>
    </div>
  );
};

export default Bg02;
