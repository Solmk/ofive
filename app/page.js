/**
 * app/page.js — Home
 * Assembles sections in narrative order.
 * Each section is a self-contained client component with its own GSAP scope.
 */

import Hero     from '@/sections/Hero';
import About    from '@/sections/About';
import Projects from '@/sections/Projects';
import Skills   from '@/sections/Skills';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
    </>
  );
}
