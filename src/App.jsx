import { useEffect, useState } from "react";
import Lenis from "lenis";
import { motion, useScroll, useSpring } from "framer-motion";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Ethos from "./components/Ethos";
import Treks from "./components/Treks";
import Steps from "./components/Steps";
import Voices from "./components/Voices";
import Join from "./components/Join";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";

export default function App() {
  const [booking, setBooking] = useState(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Preloader />
      <motion.div
        style={{ scaleX: progress, originX: 0 }}
        className="fixed inset-x-0 top-0 z-[70] h-[2px] bg-amber"
      />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Ethos />
        <Treks onBook={setBooking} />
        <Steps />
        <Voices />
        <Join />
      </main>
      <Footer />
      <BookingModal trek={booking} onClose={() => setBooking(null)} />
    </>
  );
}
