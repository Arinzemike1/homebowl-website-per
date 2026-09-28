import { useId } from "react";

// Felt / gingham "sewn-on" stickers that appear throughout the campaign posts.

type PatchKind = "tomato" | "fish" | "heart" | "star" | "chili";

type PatchProps = {
  kind: PatchKind;
  className?: string;
};

const stitch = {
  fill: "none",
  strokeWidth: 1.6,
  strokeDasharray: "3.2 2.6",
  strokeLinecap: "round" as const,
};

export default function Patch({ kind, className = "" }: PatchProps) {
  const id = useId().replace(/:/g, "");
  const cls = `shadow-sticker ${className}`;

  switch (kind) {
    case "heart":
      return (
        <svg viewBox="0 0 100 92" className={cls} aria-hidden>
          <defs>
            <pattern
              id={`g${id}`}
              width="11"
              height="11"
              patternUnits="userSpaceOnUse"
            >
              <rect width="11" height="11" fill="#fbf1e4" />
              <rect width="5.5" height="11" fill="#f0a152" opacity=".5" />
              <rect width="11" height="5.5" fill="#f0a152" opacity=".5" />
            </pattern>
          </defs>
          <path
            d="M50 88C18 66 4 49 6 29 8 13 22 4 35 6c8 1 12 6 15 12 3-6 7-11 15-12 13-2 27 7 29 23 2 20-12 37-44 59Z"
            fill={`url(#g${id})`}
            stroke="#efe2d0"
            strokeWidth="3"
          />
          <path
            d="M50 79C23 60 13 46 14 30c1-11 11-17 21-16 7 1 11 6 15 13 4-7 8-12 15-13 10-1 20 5 21 16 1 16-9 30-36 49Z"
            stroke="#c7732c"
            {...stitch}
          />
        </svg>
      );

    case "tomato":
      return (
        <svg viewBox="0 0 100 100" className={cls} aria-hidden>
          <defs>
            <radialGradient id={`t${id}`} cx="38%" cy="38%" r="70%">
              <stop offset="0" stopColor="#ef4a3c" />
              <stop offset=".7" stopColor="#d22d24" />
              <stop offset="1" stopColor="#a91d17" />
            </radialGradient>
            <pattern
              id={`l${id}`}
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <rect width="8" height="8" fill="#e8f3df" />
              <rect width="4" height="8" fill="#3f9a3c" opacity=".7" />
              <rect width="8" height="4" fill="#3f9a3c" opacity=".7" />
            </pattern>
          </defs>
          <path
            d="M50 22c22 0 42 12 42 36 0 22-19 38-42 38S8 80 8 58c0-24 20-36 42-36Z"
            fill={`url(#t${id})`}
          />
          <path
            d="M50 29c18 0 35 10 35 29 0 18-16 31-35 31S15 76 15 58c0-19 17-29 35-29Z"
            stroke="#ff8a78"
            opacity=".75"
            {...stitch}
          />
          <path
            d="M50 30 36 18l10 1-6-12 12 8 6-11 3 13 12-4-9 11 12 5-16 2Z"
            fill={`url(#l${id})`}
            stroke="#2f7a2e"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "fish":
      return (
        <svg viewBox="0 0 120 80" className={cls} aria-hidden>
          <defs>
            <pattern
              id={`f${id}`}
              width="9"
              height="9"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <rect width="9" height="9" fill="#8a3526" />
              <circle cx="4.5" cy="4.5" r="1.6" fill="#c46a4a" />
              <path d="M0 0h9" stroke="#6e271b" strokeWidth="1" />
            </pattern>
          </defs>
          <path d="M92 40 116 20v40Z" fill="#d8322b" />
          <path d="M40 16c14-10 26-6 28-2-8 0-16 3-22 8Z" fill="#e0532f" />
          <path
            d="M8 40c10-18 34-26 58-22 13 2 24 10 30 22-6 12-17 20-30 22-24 4-48-4-58-22Z"
            fill={`url(#f${id})`}
          />
          <path
            d="M8 40c6-10 16-17 28-20-4 7-5 33 0 40-12-3-22-10-28-20Z"
            fill="#d8322b"
          />
          <path d="M50 58c6 6 14 9 20 8-3-4-8-7-12-8Z" fill="#3b9a44" />
          <path
            d="M13 40c10-15 32-21 53-18 11 2 20 8 25 18-5 10-14 16-25 18-21 3-43-3-53-18Z"
            stroke="#f2b4a0"
            opacity=".8"
            {...stitch}
          />
          <circle
            cx="22"
            cy="36"
            r="5.5"
            fill="#f6d64a"
            stroke="#8a6b12"
            strokeWidth=".8"
          />
          <circle cx="23" cy="36" r="2.2" fill="#1b120c" />
        </svg>
      );

    case "star":
      return (
        <svg viewBox="0 0 100 100" className={cls} aria-hidden>
          <defs>
            <pattern
              id={`s${id}`}
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <rect width="10" height="10" fill="#f0c65a" />
              <circle cx="5" cy="5" r="1.5" fill="#fff6dc" />
            </pattern>
          </defs>
          <path
            d="M50 6c3 0 5 2 6 5l9 20 22 3c6 1 8 8 4 12L75 62l4 22c1 6-5 10-11 7L50 81 32 91c-6 3-12-1-11-7l4-22L9 46c-4-4-2-11 4-12l22-3 9-20c1-3 3-5 6-5Z"
            fill={`url(#s${id})`}
          />
          <path
            d="M50 15l8 18 20 3c3 0 4 4 2 6L66 58l4 20c0 3-3 5-6 4L50 72l-16 10c-3 1-6-1-6-4l4-20-14-16c-2-2-1-6 2-6l20-3Z"
            stroke="#c99a2c"
            {...stitch}
          />
        </svg>
      );

    case "chili":
      return (
        <svg viewBox="0 0 70 120" className={cls} aria-hidden>
          <path
            d="M30 24c10-2 22 4 24 18 3 24-6 52-22 72-3 4-8 2-8-3 2-22-8-40-8-62 0-14 5-23 14-25Z"
            fill="#d8322b"
          />
          <path
            d="M31 31c7-1 15 4 17 14 2 20-4 42-16 60"
            stroke="#ff8e7a"
            opacity=".8"
            {...stitch}
          />
          <path
            d="M18 30c2-8 10-12 18-10 6 1 12 5 14 11-6-3-12-4-17-2-5 1-10 1-15 1Z"
            fill="#4e9a3a"
          />
          <path
            d="M33 21c0-8 3-14 9-18"
            stroke="#3b7a2c"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );
  }
}
