"use client";

import { useState, useEffect } from "react";
import { Hero } from "@/components/hero";
import { CharacterGrid } from "@/components/character-grid";
import { LocationGrid } from "@/components/location-grid";
import { ConceptGrid } from "@/components/concept-grid";
import { StorylineGrid } from "@/components/storylineGrid";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <header className="fixed top-0 w-full bg-[#121214]/80 backdrop-blur-sm z-50">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <span className="text-xl font-bold">Batman Universe</span>

           <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-slate-400 hover:text-slate-50 focus:outline-none"
            >
              {menuOpen ? (
                <span className="text-2xl">✖</span>
              ) : (
                <span className="text-2xl">☰</span>
              )}
            </button>
          </div>


          <div
            className={`${
              menuOpen ? "block" : "hidden"
            } absolute top-16 left-0 w-full bg-[#121214]/90 md:static md:flex md:w-auto md:gap-8 md:bg-transparent md:block px-4 py-6 md:py-0`}
          >
            <a
              href="#characters"
              className="block text-sm text-slate-400 hover:text-yellow-500 mb-2 md:mb-0"
            >
              Characters
            </a>
            <a
              href="#locations"
              className="block text-sm text-slate-400 hover:text-yellow-500 mb-2 md:mb-0"
            >
              Locations
            </a>
            <a
              href="#concepts"
              className="block text-sm text-slate-400 hover:text-yellow-500 mb-2 md:mb-0"
            >
              Concepts
            </a>
            <a
              href="#storyline"
              className="block text-sm text-slate-400 hover:text-yellow-500"
            >
              Storyline
            </a>
          </div>
        </nav>
      </header>

      <main className="pt-16">
        <Hero />
        <div className="container mx-auto px-4 py-16 space-y-16">
          <section id="characters">
            <h2 className="text-3xl font-bold mb-8 text-yellow-500">
              Featured Characters
            </h2>
            <CharacterGrid />
          </section>
          <section id="locations">
            <h2 className="text-3xl font-bold mb-8 text-yellow-500">
              Iconic Locations
            </h2>
            <LocationGrid />
          </section>
          <section id="concepts">
            <h2 className="text-3xl font-bold mb-8 text-yellow-500">Concepts</h2>
            <ConceptGrid />
          </section>
          <section id="storyline">
            <h2 className="text-3xl font-bold mb-8 text-yellow-500">
              Storyline
            </h2>
            <StorylineGrid />
          </section>
        </div>
      </main>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-8 md:bottom-24 bg-yellow-500/80 text-white p-3 rounded-full shadow-lg hover:bg-yellow-500 transition"
          aria-label="Back to Top"
        >
          ↑
        </button>
      )}
      <div className="fixed bottom-0 left-0 right-0 text-center py-4 md:py-5 bg-black z-50 text-white text-sm md:text-base px-4">
        Copyright © 2025 | Made with love and persistence 🤍💪🏽
      </div>
    </div>
  );
}
