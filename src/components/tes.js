import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

useEffect(() => {
  AOS.init({
    duration: 800,     // smooth timing
    easing: 'ease-out', // natural feel
    once: true,        // animate only once (minimalist preference)
    offset: 100,       // start a bit earlier
  });
}, []);