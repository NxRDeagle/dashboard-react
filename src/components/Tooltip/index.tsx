import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type FC,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

interface Props {
  content: string;
  delay?: number;
  children: ReactNode;
  className?: string;
}

export const Tooltip: FC<Props> = ({
  content,
  delay = 1000,
  children,
  className,
}) => {
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ref = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = useCallback(() => {
    timerRef.current = setTimeout(() => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setCoords({ x: rect.left, y: rect.top });
      }
    }, delay);
  }, [delay]);

  const handleMouseLeave = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setCoords(null);
  }, []);

  // Очистить таймер на таймауте
  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  return (
    <span
      ref={ref}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {coords &&
        createPortal(
          <div
            role="tooltip"
            style={{
              position: "fixed",
              left: coords.x,
              top: coords.y,
              transform: "translateY(calc(-100% - 6px))",
              zIndex: 9999,
              maxWidth: "240px",
            }}
            className="px-2.5 py-1.5 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg shadow-xl pointer-events-none leading-relaxed break-words"
          >
            {content}
          </div>,
          document.body,
        )}
    </span>
  );
};
