import { MotionConfig } from "motion/react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import Experiences from "./sections/Experiences";
import Projects from "./sections/Projects";
import Process from "./sections/Process";
import About from "./sections/About";
import Contact from "./sections/Contact";
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="main">
        <Hero />
        <div className="capability-strip">
          <span>DESENVOLVIMENTO WEB</span>
          <i>✳</i>
          <span>SISTEMAS PERSONALIZADOS</span>
          <i>✳</i>
          <span>AUTOMAÇÃO</span>
          <i>✳</i>
          <span>INTELIGÊNCIA ARTIFICIAL</span>
        </div>
        <Services />
        <Experiences />
        <Projects />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
