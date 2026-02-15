"use client";
import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import LoadingScreen from "./components/LoadingScreen";

export default function Home() {
  const [videoReady, setVideoReady] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Preload the video
  useEffect(() => {
    const video = document.createElement("video");
    video.src = "/ssss.mp4";
    video.preload = "auto";
    video.muted = true;

    video.oncanplaythrough = () => {
      setVideoReady(true);
    };

    // Fallback timeout in case the event doesn't fire
    const timeout = setTimeout(() => {
      setVideoReady(true);
    }, 10000);

    video.load();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {!showContent && (
        <LoadingScreen
          ready={videoReady}
          onHidden={() => setShowContent(true)}
        />
      )}
      <div
        style={{
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >

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
      </div>
    </>
  );
}
