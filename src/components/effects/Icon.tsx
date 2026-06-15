"use client";

import type { CSSProperties } from "react";

/* Lightweight inline line-icon set (24x24, stroke-based) so we never rely on emoji. */
const PATHS: Record<string, React.ReactNode> = {
  brain: (
    <path d="M12 5a3 3 0 0 0-3 3 3 3 0 0 0-2 5.2A3 3 0 0 0 9 18a3 3 0 0 0 3 1 3 3 0 0 0 3-1 3 3 0 0 0 2-4.8A3 3 0 0 0 15 8a3 3 0 0 0-3-3Zm0 0v14" />
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  link: (
    <>
      <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5" />
      <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5" />
    </>
  ),
  map: (
    <>
      <path d="m9 4 6 2 6-2v14l-6 2-6-2-6 2V6l6-2Z" />
      <path d="M9 4v14M15 6v14" />
    </>
  ),
  home: (
    <>
      <path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      <path d="M9 21v-7h6v7" />
    </>
  ),
  factory: (
    <>
      <path d="M2 20V9l6 4V9l6 4V4h6v16Z" />
      <path d="M6 17h.01M10 17h.01M14 17h.01M18 17h.01" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h.01M15 15h.01" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16M10 11v6M14 11v6" />
      <path d="M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13M9 7V4h6v3" />
    </>
  ),
  recycle: (
    <path d="M7 19h10M7 19l-3-5 3-2M17 19l3-5-3-2M12 3 9 8h6Zm-3 5-3 5m9-5 3 5" />
  ),
  leaf: (
    <>
      <path d="M4 20c0-9 7-15 16-15 0 9-7 15-16 15Z" />
      <path d="M9 15c3-3 6-4 9-5" />
    </>
  ),
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7Z" />,
  wrench: (
    <path d="M14.5 5.5a4 4 0 0 0-5.3 4.9l-6 6 2.4 2.4 6-6a4 4 0 0 0 4.9-5.3l-2.6 2.6-2-2Z" />
  ),
  city: (
    <>
      <path d="M3 21V9l5-3v15M8 21V3l6 3v15M14 21V9l7 3v9" />
      <path d="M3 21h18" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
    </>
  ),
  mountain: <path d="m3 20 6-11 4 6 2-3 6 8Z" />,
  gauge: (
    <>
      <path d="M12 14 16 9" />
      <path d="M3 18a9 9 0 1 1 18 0" />
    </>
  ),
};

interface IconProps {
  name: keyof typeof PATHS | string;
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export default function Icon({
  name,
  size = 24,
  color = "currentColor",
  className,
  style,
}: IconProps) {
  const path = PATHS[name];
  if (!path) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}
