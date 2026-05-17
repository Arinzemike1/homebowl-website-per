import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import PopularMeals from "@/components/PopularMeals";
import FeaturedChefs from "@/components/FeaturedChefs";
import WhyHomeBowl from "@/components/WhyHomeBowl";
import AppDownload from "@/components/AppDownload";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <PopularMeals />
        <FeaturedChefs />
        <WhyHomeBowl />
        <Testimonials />
        <AppDownload />
      </main>
      <Footer />
    </>
  );
}
