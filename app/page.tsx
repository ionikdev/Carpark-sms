import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Narbar/Narvbar";
import Plan from "@/components/Plan/Plan";
import Value from "@/components/Value/Value";
import Works from "@/components/Works/Works";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Plan />
      <Value />
      <Works />
      <Footer />
    </main>
  );
}
