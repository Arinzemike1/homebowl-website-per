// Waitlist is paused while the full site is live. To bring it back, uncomment
// the import and the early return below (the API route at /api/waitlist is untouched).
// import Waitlist from "@/components/Waitlist";
import BowlOfTheWeek from "@/components/sections/BowlOfTheWeek";
import Download from "@/components/sections/Download";
import FAQ from "@/components/sections/FAQ";
import FeedGallery from "@/components/sections/FeedGallery";
import FollowChefs from "@/components/sections/FollowChefs";
import Footer from "@/components/sections/Footer";
import ForChefs from "@/components/sections/ForChefs";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Intro from "@/components/sections/Intro";
import Manifesto from "@/components/sections/Manifesto";
import Navbar from "@/components/sections/Navbar";
import Ticker from "@/components/sections/Ticker";

export default function Home() {
  // return <Waitlist />;

  return (
    <>
      <Intro />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Manifesto />
        <HowItWorks />
        <BowlOfTheWeek />
        <ForChefs />
        <FollowChefs />
        <FeedGallery />
        <FAQ />
        <Download />
      </main>
      <Footer />
    </>
  );
}
