// Single place for links that change as HomeBowl rolls out.
// Leave a store URL empty to show that badge as "Coming soon".
export const site = {
  name: "HomeBowl",
  tagline: "Good food. Home made.",
  handle: "@gethomebowl",
  appStoreUrl: "",
  playStoreUrl: "",
  socials: [
    { label: "Instagram", href: "https://instagram.com/gethomebowl" },
    { label: "X", href: "https://x.com/gethomebowl" },
  ],
  nav: [
    { label: "How it works", href: "#how-it-works" },
    { label: "For chefs", href: "#for-chefs" },
    { label: "Bowl of the Week", href: "#bowl-of-the-week" },
    { label: "FAQ", href: "#faq" },
  ],
} as const;
