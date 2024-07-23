import React from 'react';

function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  element: Document = document
) {
  const savedHandler = React.useRef<(event: DocumentEventMap[K]) => void>();

  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  React.useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event: DocumentEventMap[K]) =>
      savedHandler.current?.(event);

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

interface AnimatedCursorProps {
  color?: string;
  outerAlpha?: number;
  innerSize?: number;
  outerSize?: number;
  outerScale?: number;
  innerScale?: number;
}

const AnimatedCursor: React.FC<AnimatedCursorProps> = ({
  color = '246, 183, 90',
  outerAlpha = 0.4,
  innerSize = 8,
  outerSize = 8,
  outerScale = 5,
  innerScale = 0.7,
}) => {
  const cursorOuterRef = React.useRef<HTMLDivElement>(null);
  const cursorInnerRef = React.useRef<HTMLDivElement>(null);
  const requestRef = React.useRef<number>();
  const previousTimeRef = React.useRef<number>();
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = React.useState(true);
  const [isActive, setIsActive] = React.useState(false);
  const [isActiveClickable, setIsActiveClickable] = React.useState(false);
  const endX = React.useRef(0);
  const endY = React.useRef(0);

  const onMouseMove = React.useCallback(({ clientX, clientY }: MouseEvent) => {
    setCoords({ x: clientX, y: clientY });
    if (cursorInnerRef.current) {
      cursorInnerRef.current.style.top = `${clientY}px`;
      cursorInnerRef.current.style.left = `${clientX}px`;
    }
    endX.current = clientX;
    endY.current = clientY;
  }, []);

  const animateOuterCursor = React.useCallback(
    (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const newX = coords.x + (endX.current - coords.x) / 8;
        const newY = coords.y + (endY.current - coords.y) / 8;
        setCoords({ x: newX, y: newY });
        if (cursorOuterRef.current) {
          cursorOuterRef.current.style.top = `${newY}px`;
          cursorOuterRef.current.style.left = `${newX}px`;
        }
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animateOuterCursor);
    },
    [coords]
  );

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animateOuterCursor);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animateOuterCursor]);

  const onMouseDown = React.useCallback(() => setIsActive(true), []);
  const onMouseUp = React.useCallback(() => setIsActive(false), []);
  const onMouseEnter = React.useCallback(() => setIsVisible(true), []);
  const onMouseLeave = React.useCallback(() => setIsVisible(false), []);

  useEventListener('mousemove', onMouseMove, document);
  useEventListener('mousedown', onMouseDown, document);
  useEventListener('mouseup', onMouseUp, document);
  useEventListener('mouseenter', onMouseEnter, document);
  useEventListener('mouseleave', onMouseLeave, document);

  React.useEffect(() => {
    if (isActive) {
      if (cursorInnerRef.current) {
        cursorInnerRef.current.style.transform = `scale(${innerScale})`;
      }
      if (cursorOuterRef.current) {
        cursorOuterRef.current.style.transform = `scale(${outerScale})`;
      }
    } else {
      if (cursorInnerRef.current) {
        cursorInnerRef.current.style.transform = 'scale(1)';
      }
      if (cursorOuterRef.current) {
        cursorOuterRef.current.style.transform = 'scale(1)';
      }
    }
  }, [innerScale, outerScale, isActive]);

  React.useEffect(() => {
    if (isActiveClickable) {
      if (cursorInnerRef.current) {
        cursorInnerRef.current.style.transform = `scale(${innerScale * 1.3})`;
      }
      if (cursorOuterRef.current) {
        cursorOuterRef.current.style.transform = `scale(${outerScale * 1.4})`;
      }
    }
  }, [innerScale, outerScale, isActiveClickable]);

  React.useEffect(() => {
    if (isVisible) {
      if (cursorInnerRef.current) {
        cursorInnerRef.current.style.opacity = '1';
      }
      if (cursorOuterRef.current) {
        cursorOuterRef.current.style.opacity = '1';
      }
    } else {
      if (cursorInnerRef.current) {
        cursorInnerRef.current.style.opacity = '0';
      }
      if (cursorOuterRef.current) {
        cursorOuterRef.current.style.opacity = '0';
      }
    }
  }, [isVisible]);

  React.useEffect(() => {
    const clickables = document.querySelectorAll(
      'a, input[type="submit"], input[type="image"], label[for], select, button, .link'
    );

    clickables.forEach((el) => {
      (el as HTMLElement).style.cursor = 'none';

      const handleMouseOver = () => setIsActive(true);
      const handleClick = () => {
        setIsActive(true);
        setIsActiveClickable(false);
      };
      const handleMouseDown = () => setIsActiveClickable(true);
      const handleMouseUp = () => setIsActive(true);
      const handleMouseOut = () => {
        setIsActive(false);
        setIsActiveClickable(false);
      };

      el.addEventListener('mouseover', handleMouseOver);
      el.addEventListener('click', handleClick);
      el.addEventListener('mousedown', handleMouseDown);
      el.addEventListener('mouseup', handleMouseUp);
      el.addEventListener('mouseout', handleMouseOut);

      return () => {
        el.removeEventListener('mouseover', handleMouseOver);
        el.removeEventListener('click', handleClick);
        el.removeEventListener('mousedown', handleMouseDown);
        el.removeEventListener('mouseup', handleMouseUp);
        el.removeEventListener('mouseout', handleMouseOut);
      };
    });
  }, [isActive]);

  const styles: Record<string, React.CSSProperties> = {
    cursor: {
      zIndex: 999,
      position: 'fixed',
      opacity: 1,
      pointerEvents: 'none',
      transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
    },
    cursorInner: {
      zIndex: 999,
      position: 'fixed',
      borderRadius: '50%',
      width: innerSize,
      height: innerSize,
      pointerEvents: 'none',
      backgroundColor: `rgba(${color}, 1)`,
      transition: 'opacity 0.15s ease-in-out, transform 0.25s ease-in-out',
    },
    cursorOuter: {
      zIndex: 999,
      position: 'fixed',
      borderRadius: '50%',
      pointerEvents: 'none',
      width: outerSize,
      height: outerSize,
      backgroundColor: `rgba(${color}, ${outerAlpha})`,
      transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
    },
  };

  return (
    <>
      <div ref={cursorOuterRef} style={styles.cursorOuter} />
      <div ref={cursorInnerRef} style={styles.cursorInner} />
    </>
  );
};

export default AnimatedCursor;
