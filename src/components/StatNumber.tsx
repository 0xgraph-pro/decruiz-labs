import React from "react";
import { useCountUp } from "../hooks/useCountUp";

type Props = {
  /** Raw string value like "100K+", "$4.2M+", "99.98%", "50K+", "4.9★", etc. */
  raw: string;
  className?: string;
  duration?: number;
};

/** Parses a raw stat string, animates the numeric part, and preserves prefix/suffix. */
export default function StatNumber({ raw, className = "", duration = 1.8 }: Props) {
  // Extract leading non-numeric prefix, numeric body (with optional decimal), trailing suffix
  const match = raw.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);

  if (!match) {
    // Non-numeric string — just render as-is
    return <span className={className}>{raw}</span>;
  }

  const prefix = match[1]; // e.g. "$"
  const numStr = match[2]; // e.g. "4.2"
  const suffix = match[3]; // e.g. "M+" or "K+"
  const endVal = parseFloat(numStr);
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { ref, display } = useCountUp({ end: endVal, duration, decimals, prefix, suffix });

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className={className}>
      {display}
    </span>
  );
}
