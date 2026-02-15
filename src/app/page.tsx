import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";


export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Contact />
        <div id="music" style={{ height: "1px", width: "1px", position: "absolute", bottom: "0" }}></div>
        <MusicPlayer />
      </main>
      <Footer />
    </>
  );
}
