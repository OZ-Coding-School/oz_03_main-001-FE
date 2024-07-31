import { useRef, useEffect, CSSProperties } from 'react';
import canvasConfetti, {
  CreateTypes,
  GlobalOptions,
  Options,
} from 'canvas-confetti'; // 색종이 날림 효과를 위한 import

export interface IProps extends Options, GlobalOptions {
  fire?: any;
  reset?: any;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: CSSProperties;
  refConfetti?: (confetti: CreateTypes | null) => void; // confetti인스터스 참소를 위한 콜백함수
  onDecay?: () => void;
  onFire?: () => void;
  onReset?: () => void;
} // props의 타입정의

const ReactCanvasConfetti: React.FC<IProps> = (props) => {
  const {
    fire, // 애니메이션 실행여부 true면 발사
    reset, // 애미네이션 초기화여부 true면 초기화
    width = window.innerWidth, //갠버스 너비
    height = window.innerHeight, //캔버스 높이
    className, //캔버스 css속성
    style, //인라인스타일속성
    refConfetti, //인스턴스 생성또는 해제시 호출
    onDecay, // 애니메이션이 끝날 때 호출되는 함수 (confetti가 화면에서 사라질 때 실행)
    onFire, // 애니메이션이 시작될 때 호출되는 함수 (confetti가 발사될 때 실행)
    onReset, // 애니메이션이 초기화될 때 호출되는 함수 (confetti 상태가 리셋될 때 실행)
    resize = true, // 애니메이션이 컨버스 크기에 맞춰 조정될지 여부 설정 기본값은 true
    useWorker = true, // wdb worker를 사용할지 여부 설정 기본값은 true
    ...confettiProps // 위에 명시된 속성 제외 모든 프랍스 여기에 모음
  } = props;
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const confetti = useRef<CreateTypes | null>(null);

  useEffect(() => {
    if (!refCanvas.current) {
      return;
    }

    const globalOptions: GlobalOptions = {
      resize,
      useWorker,
    };

    confetti.current = canvasConfetti.create(refCanvas.current, globalOptions);

    if (refConfetti) {
      refConfetti(confetti.current);
    }

    return () => {
      if (refConfetti) {
        refConfetti(null);
      }
    };
  }, [resize, useWorker, refConfetti]);

  useEffect(() => {
    if (fire) {
      fireConfetti();
    }
  }, [fire]);

  useEffect(() => {
    if (reset) {
      resetConfetti();
    }
  }, [reset]);

  const fireConfetti = () => {
    if (!confetti.current) {
      return;
    }

    if (onFire) {
      onFire();
    }

    const promise = confetti.current({
      ...confettiProps,
      origin: { x: 0.5, y: 0.37 },
      spread: 360,
      particleCount: 300,
      gravity: 0.3,
      startVelocity: 35,
      decay: 0.9,
      angle: 270,
    });

    if (promise && onDecay) {
      promise.then(() => {
        onDecay();
      });
    }
  };

  const resetConfetti = () => {
    if (confetti.current) {
      confetti.current.reset();
      if (onReset) {
        onReset();
      }
    }
  };

  return (
    <canvas
      ref={refCanvas}
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        ...style,
      }}
    />
  );
};

export default ReactCanvasConfetti;
