import Image from "next/image";

type LogoProps = {
  /** "dark" = brown wordmark for light backgrounds, "light" = cream wordmark for dark ones */
  tone?: "dark" | "light";
  /** Height of the bowl mark in px; the wordmark scales with it */
  height?: number;
  className?: string;
};

// Proportions measured from /public/logo.png (mark 195×282, wordmark 391×61)
const WORDMARK_RATIO = 391 / 61;

// Default height matches the old 200px-wide logo, so the waitlist page looks unchanged.
const Logo = ({ tone = "dark", height = 80, className = "" }: LogoProps) => {
  const wordHeight = height * 0.22;

  return (
    <span
      role="img"
      aria-label="HomeBowl"
      className={`inline-flex items-end ${className}`}
      style={{ gap: height * 0.12 }}
    >
      <Image
        src="/brand/logo-mark.png"
        alt=""
        width={195}
        height={282}
        style={{ height, width: "auto" }}
      />
      <span
        aria-hidden
        className="block"
        style={{
          height: wordHeight,
          width: wordHeight * WORDMARK_RATIO,
          marginBottom: height * 0.22,
          backgroundColor: tone === "light" ? "var(--color-ivory)" : "#3f2517",
          WebkitMask:
            "url(/brand/logo-wordmark.png) center / contain no-repeat",
          mask: "url(/brand/logo-wordmark.png) center / contain no-repeat",
        }}
      />
    </span>
  );
};

export default Logo;
