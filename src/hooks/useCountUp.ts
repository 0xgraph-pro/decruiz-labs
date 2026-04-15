import { useEffect, useRef, useState } from "react";

type CountUpOptions = {
  /** Final numeric value to count to */
  end: number;
  /** Duration in seconds (default 1.8) */
  duration?: number;
  /** Decimal places (default 0) */
  decimals?: number;
  /** Prefix string, e.g. "$" */
  prefix?: string;
  /** Suffix string, e.g. "K+" */
  suffix?: string;
  /** Start counting only when the element enters the viewport */
  triggerOnView?: boolean;
};

/**
 * Returns a formatted string that counts up from 0 → end once the
 * returned `ref` is attached to a DOM element (intersection observer).
 */
export function useCountUp({
  end,
  duration = 1.8,
  decimals = 0,
  prefix = "",
  suffix = "",
  triggerOnView = true,
}: CountUpOptions) {
  const ref = useRef<HTMLElement | null>(null);
  const [display, setDisplay] = useState(`${prefix}${(0).toFixed(decimals)}${suffix}`);
  const hasRun = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const run = () => {
      if (hasRun.current) return;
      hasRun.current = true;

      const startTime = performance.now();
      const tick = (now: number) => {
        const elapsed = (now - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutExpo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = eased * end;
        setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (!triggerOnView) {
      run();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration, decimals, prefix, suffix, triggerOnView]);

  return { ref, display };
}
