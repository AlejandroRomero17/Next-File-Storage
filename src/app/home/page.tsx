import AboutSectionOne from "@/_components/About/AboutSectionOne";
import AboutSectionTwo from "@/_components/About/AboutSectionTwo";
import ScrollUp from "@/_components/Common/ScrollUp";
import Features from "@/_components/Features";
import Hero from "@/_components/Hero";
import Testimonials from "@/_components/Testimonials";
import Video from "@/_components/Video";
import { Inter } from "next/font/google";
import Header from "@/_components/Header";
import Footer from "@/_components/Footer";
import { Providers } from "../provider";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Providers>
        <Header />
        <ScrollUp />
        <Hero />
        <Features />
        <Video />
        <AboutSectionOne />
        <AboutSectionTwo />
        <Footer />
        {/* <ScrollToTop /> */}
      </Providers>
    </>
  );
}
