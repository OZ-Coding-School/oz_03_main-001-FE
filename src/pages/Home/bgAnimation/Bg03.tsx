import { useEffect, useRef } from 'react';

const Bg03 = () => {
  const bg03PathRef = useRef<SVGPathElement | null>(null);
  const bg03OriginPath =
    'M101.007 546.206C7.80956 477.792 -14.5776 427.591 9.64388 341.294C60.1604 161.295 326.239 109.271 480.157 48.919C599.037 2.31209 744.892 -40.7909 843.699 68.947C954.909 192.41 900.12 419.454 746.108 472.694C635.649 510.857 615.421 538.743 606.168 665.6C595.889 806.542 555.683 861.628 458.657 867.7C382.021 872.517 322.328 825.173 285.256 762.545C201.139 620.45 199.458 618.467 101.007 546.206Z';
  const bg03ModPath =
    'M101.251 546.632C8.05375 478.218 -14.3334 428.016 9.88808 341.72C60.4045 161.721 326.483 109.697 480.401 49.3448C599.282 2.7379 745.137 -40.3652 843.944 69.3728C955.153 192.836 919.012 436.761 765 490C681.877 535.627 673 559 630 673C619.721 813.942 555.928 862.054 458.902 868.126C382.265 872.943 322.572 825.599 285.5 762.971C201.383 620.876 199.702 618.892 101.251 546.632Z';
  const bg03AniDuration = 5000; // 애니메이션 지속 시간(밀리초)
  const bg03RestDuration = 5000; // 복원 애니메이션 지속 시간(밀리초)

  useEffect(() => {
    const animatePathBg03 = () => {
      if (bg03PathRef.current) {
        bg03PathRef.current.style.transition = `d ${bg03AniDuration}ms`;
        bg03PathRef.current.setAttribute('d', bg03ModPath);

        setTimeout(() => {
          if (bg03PathRef.current) {
            bg03PathRef.current.style.transition = `d ${bg03RestDuration}ms`;
            bg03PathRef.current.setAttribute('d', bg03OriginPath);

            setTimeout(() => {
              if (bg03PathRef.current) {
                bg03PathRef.current.style.transition = 'none';
                requestAnimationFrame(animatePathBg03);
              }
            }, bg03RestDuration);
          }
        }, bg03AniDuration);
      }
    };

    animatePathBg03();
  }, []);

  return (
    <div className='bg-03 absolute bottom-[110px] left-[-200px] -z-10 animate-bg3_move'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='903'
        height='869'
        viewBox='0 0 903 869'
      >
        <path
          id='bg03'
          ref={bg03PathRef}
          d={bg03OriginPath}
          fill='#D5F5D2'
          fillOpacity='0.3'
        />
      </svg>
    </div>
  );
};

export default Bg03;
