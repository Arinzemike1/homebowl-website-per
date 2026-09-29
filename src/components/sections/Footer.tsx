import Logo from "@/components/Logo";
import { StoreBadges } from "@/components/ui/decor";
import { ScriptWord } from "@/components/ui/motion";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-espresso-950 text-ivory">
      <div className="mx-auto max-w-7xl px-5 pt-24 sm:px-8">
        <p className="text-[clamp(3.4rem,11vw,10rem)] leading-none">
          <span className="display block uppercase">Good food.</span>
          <ScriptWord className="-mt-[0.3em] block text-[1.2em]">
            Home made.
          </ScriptWord>
        </p>

        <div className="mt-16 grid gap-12 border-t border-ivory/10 pt-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div>
            <Logo tone="light" height={52} />
            <p className="mt-5 max-w-xs text-ivory/60">
              Where home chefs create, connect and sell, and food lovers find
              their next favourite bowl.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-ivory/40">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5">
              {site.nav.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-ivory/80 transition-colors hover:text-tangerine"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-ivory/40">
              Follow
            </p>
            <ul className="mt-4 space-y-2.5">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ivory/80 transition-colors hover:text-tangerine"
                  >
                    {s.label}{" "}
                    <span className="text-ivory/40">{site.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-ivory/40">
              Get the app
            </p>
            <div className="mt-4">
              <StoreBadges />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ivory/10 py-8 text-[13px] text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} HomeBowl. All rights reserved.</p>
          <p>Made with love in Lagos.</p>
        </div>
      </div>
      <div aria-hidden className="checker h-10 [--cell:20px]" />
    </footer>
  );
}
