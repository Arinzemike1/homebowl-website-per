import Image from "next/image";

// Brand curtain shown once per session. Animation lives in globals.css (.intro*).
export default function Intro() {
  return (
    <div
      aria-hidden
      className="intro fixed inset-0 z-100 flex flex-col items-center justify-center gap-6 bg-espresso-950"
    >
      <div className="flex items-end gap-4">
        <Image
          src="/brand/logo-mark.png"
          alt=""
          width={195}
          height={282}
          preload
          className="intro-mark h-24 w-auto sm:h-28"
        />
        <span
          className="intro-word mb-5 block h-[26px] w-[167px] bg-ivory sm:mb-6 sm:h-[30px] sm:w-[192px]"
          style={{
            WebkitMask:
              "url(/brand/logo-wordmark.png) center / contain no-repeat",
            mask: "url(/brand/logo-wordmark.png) center / contain no-repeat",
          }}
        />
      </div>
      <p className="intro-tag script script-gradient text-5xl sm:text-6xl">
        Good food. Home made.
      </p>
    </div>
  );
}
